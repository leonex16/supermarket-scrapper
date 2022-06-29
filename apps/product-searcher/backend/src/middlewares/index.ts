/* eslint-disable require-atomic-updates */
import { Context, Next } from 'koa';

import { LoggerConsole } from '../../../../../src/product-searcher/shared/infrastructure/logger-console-logger';
import { HttpResponse, InternalServerHttpResponse, NotFoundHttpResponse } from '../models';

const removeQueryString = ( url: string ) => {
  const urlWithoutQueryString = url.split( '?' )[ 0 ];
  return urlWithoutQueryString.trim();
};

const logger = new LoggerConsole();

export function timer () {
  return async function ( ctx: Context, next: Next ) {
    const path = removeQueryString( ctx.url );

    console.time( path );
    await next();
    console.timeEnd( path );
  };
}

export function handleResponse () {
  return async function ( ctx: Context, next: Next ) {
    ctx.set( 'Content-Type', 'application/json' );
    let httpResponse = new InternalServerHttpResponse();
    try {
      httpResponse = await next();
    } catch ( e: unknown ) {
      const inheritFromHttpResponse = Object.prototype.hasOwnProperty.call( e, 'status' );

      if ( inheritFromHttpResponse ) httpResponse = e as HttpResponse;

      logger.log( { url: ctx.url, error: e } );
    } finally {
      ctx.status = httpResponse.status;
      ctx.body = httpResponse.toJson();
    }
  };
}

export function handle404 () {
  return async function ( ctx: Context ) {
    return new NotFoundHttpResponse( `${ ctx.method } - ${ ctx.url }` );
  };
}
