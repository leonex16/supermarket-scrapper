/* eslint-disable require-atomic-updates */
import { Context } from 'koa';
import Router from '@koa/router';

import { ArgumentRequiredException } from '#src/errors/index';
import { Supermarkets } from '#src/types';
import { getProducts } from '#src/scrapper/useCases/getProducts';

const routerSupermarket = new Router( { prefix: '/supermarket' } );

routerSupermarket.get( '/', async( ctx: Context ) => {
  const productName = ctx.query.qproduct as string;
  const supermarket = ctx.query.qsupermarket as string;

  if ( productName === undefined ) throw new ArgumentRequiredException( 'qproduct' );
  if ( supermarket === undefined ) throw new ArgumentRequiredException( 'qsupermarket' );

  return getProducts( productName, supermarket as Supermarkets );
} );

export { routerSupermarket };
