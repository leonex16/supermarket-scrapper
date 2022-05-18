import { Context, Next } from 'koa';

import { STATUS_CODES } from '@server/constants/index';
import { ErrorHttp, ResponseHttp } from '@server/models/index';
import { I18N, StatusCodes } from '@server/i18n/index';
import { logger, removeQueryString } from '@server/functions/index';

export function timer() {
  return async function ( ctx: Context, next: Next ) {
    const path = removeQueryString( ctx.url );

    console.time( path );
    await next();
    console.timeEnd( path );
  };
}

export function handleResponse() {
  return async function ( ctx: Context, next: Next ) {
    const responseHttp = new ResponseHttp();

    ctx.set( 'Content-Type', 'application/json' );

    try {
      const data = await next();

      if ( data === undefined ) {
        const statusCode = STATUS_CODES.INTERNAL_ERROR;
        throw new ErrorHttp( statusCode, I18N.STATUS_CODES[ statusCode ] );
      }

      responseHttp.handleSuccess( data );
    } catch ( err ) {
      const error = err as ErrorHttp;
      logger( 'error', { url: ctx.url, error } );
      responseHttp.handleError( error );
    } finally {
      ctx.status = responseHttp.statusCode;
      ctx.body = responseHttp.toJSON();
    }
  };
}

export function handle404() {
  return async function ( ctx: Context ) {
    const responseHttp = new ResponseHttp();
    const statusCode = STATUS_CODES.NOT_FOUND as StatusCodes;

    responseHttp.statusCode = statusCode;
    responseHttp.message = `${ ctx.method } - ${ ctx.url } ${ I18N.STATUS_CODES[ statusCode ] }`;

    ctx.status = responseHttp.statusCode;
    ctx.body = responseHttp.toJSON();
  };
}
