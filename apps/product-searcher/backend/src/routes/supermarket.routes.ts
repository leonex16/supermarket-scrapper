/* eslint-disable require-atomic-updates */
import { Context } from 'koa';
import Router from '@koa/router';

import { OkHttpResponse } from '../models';
import { ArgumentRequiredException, ProductNameValueNotValidException, SupermarketValueNotValidException } from '../errors/index';

import { LoggerConsole } from '../../../../../src/product-searcher/shared/infrastructure/logger-console-logger';

import { BannersExtractor } from '../../../../../src/product-searcher/modules/supermarket-scrapper/application/banners-extractor';
import { PlaywrightSupermarketScrapper } from '../../../../../src/product-searcher/modules/supermarket-scrapper/infrastructure/playwright-supermarket-scrapper';
import { ProductsExtractor } from '../../../../../src/product-searcher/modules/supermarket-scrapper/application/products-extractor';

import { JumboSupermarketData } from '../../../../../src/product-searcher/modules/supermarket-data/infrastructure/jumbo-supermarket-data';
import { LiderSupermarketData } from '../../../../../src/product-searcher/modules/supermarket-data/infrastructure/lider-supermarket-data';
import { SupermarketFinder } from '../../../../../src/product-searcher/modules/supermarket-data/application/supermarket-finder';

const routerSupermarket = new Router( { prefix: '/supermarket' } );
const supermarkets = [ new LiderSupermarketData() ];
const supermarketScrapper = new PlaywrightSupermarketScrapper();
const logger = new LoggerConsole();

routerSupermarket.get( '/banners', async ( ctx: Context ) => {
  const bannersExtractor = new BannersExtractor( supermarketScrapper );
  return new OkHttpResponse( await bannersExtractor.run( supermarkets, logger ) );
} );

routerSupermarket.get( '/products', async ( ctx: Context ) => {
  const productName = ctx.query.product;
  const rawSupermarket = ctx.query.supermarket;

  if ( productName === undefined ) throw new ArgumentRequiredException( 'product' );
  if ( rawSupermarket === undefined ) throw new ArgumentRequiredException( 'supermarket' );

  if ( typeof productName !== 'string' ) throw new ProductNameValueNotValidException();
  if ( typeof rawSupermarket !== 'string' ) throw new SupermarketValueNotValidException();

  const supermarketFinder = new SupermarketFinder( supermarkets );
  const productExtractor = new ProductsExtractor( supermarketScrapper );

  const products = await productExtractor.run( productName, supermarketFinder.run( rawSupermarket ), logger );

  return new OkHttpResponse( products );
} );

export { routerSupermarket };
