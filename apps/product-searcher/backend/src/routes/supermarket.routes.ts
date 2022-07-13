/* eslint-disable require-atomic-updates */
import { Context } from 'koa';
import Router from '@koa/router';

import { OkHttpResponse } from '../models';
import { ArgumentRequiredException, ProductNameValueNotValidException, SupermarketValueNotValidException } from '../errors/index';

import { LoggerConsole } from '../../../../../src/product-searcher/shared/infrastructure/logger-console-logger';

import { PlaywrightSupermarketScrapper } from '../../../../../src/product-searcher/modules/supermarket-scrapper/infrastructure/playwright-supermarket-scrapper';
import { ProductExtractor } from '../../../../../src/product-searcher/modules/supermarket-scrapper/application/product-extractor';

import { JumboSupermarketData } from '../../../../../src/product-searcher/modules/supermarket-data/infrastructure/jumbo-supermarket-data';
import { LiderSupermarketData } from '../../../../../src/product-searcher/modules/supermarket-data/infrastructure/lider-supermarket-data';
import { SupermarketFinder } from '../../../../../src/product-searcher/modules/supermarket-data/application/supermarket-finder';

const routerSupermarket = new Router( { prefix: '/supermarket' } );

routerSupermarket.get( '/banners', async ( ctx: Context ) => {
  return null;
} );

routerSupermarket.get( '/products', async ( ctx: Context ) => {
  const productName = ctx.query.product;
  const rawSupermarket = ctx.query.supermarket;

  if ( productName === undefined ) throw new ArgumentRequiredException( 'product' );
  if ( rawSupermarket === undefined ) throw new ArgumentRequiredException( 'supermarket' );

  if ( typeof productName !== 'string' ) throw new ProductNameValueNotValidException();
  if ( typeof rawSupermarket !== 'string' ) throw new SupermarketValueNotValidException();

  const supermarkets = [ new JumboSupermarketData(), new LiderSupermarketData() ];
  const supermarketFinder = new SupermarketFinder( supermarkets );
  const productExtractor = new ProductExtractor( new PlaywrightSupermarketScrapper() );

  const products = await productExtractor.run( productName, supermarketFinder.run( rawSupermarket ), new LoggerConsole() );

  return new OkHttpResponse( products );
} );

export { routerSupermarket };
