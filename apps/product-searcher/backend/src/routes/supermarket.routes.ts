/* eslint-disable require-atomic-updates */
import { Context } from 'koa';
import Router from '@koa/router';

import { ArgumentRequiredException } from '../errors/index';
import { LoggerConsole } from '../../../../../src/product-searcher/shared/infrastructure/logger-console-logger';
import { OkHttpResponse } from '../models';
import { ProductExtractor } from '../../../../../src/product-searcher/modules/supermarket/application/extract/product-extractor';
import { SupermarketScrapperPlaywright } from '../../../../../src/product-searcher/modules/supermarket/infrastructure/supermarket-scrapper-playwright';
import { Supermarkets } from '../../../../../src/product-searcher/modules/supermarket/shared/types/index';

const routerSupermarket = new Router( { prefix: '/supermarket' } );

// routerSupermarket.get( '/banner', async ( ctx: Context ) => {
//   const supermarket = ctx.query.supermarket as string;

//   if ( supermarket === undefined ) throw new ArgumentRequiredException( 'supermarket' );

//   return null;
// } );

routerSupermarket.get( '/product', async ( ctx: Context ) => {
  const productName = ctx.query.qproduct as string;
  const supermarket = ctx.query.qsupermarket as Supermarkets;
  const productExtractor = new ProductExtractor( new SupermarketScrapperPlaywright() );
  const logger = new LoggerConsole();

  if ( productName === undefined ) throw new ArgumentRequiredException( 'qproduct' );
  if ( supermarket === undefined ) throw new ArgumentRequiredException( 'qsupermarket' );

  const products = await productExtractor.run( productName, supermarket, logger );

  return new OkHttpResponse( products );
} );

export { routerSupermarket };
