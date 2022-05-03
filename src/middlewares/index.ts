import { Context, Next } from 'koa';

import { STATUS_CODES } from '#src/constants/index';
import { ErrorHttp, ResponseHttp } from '#src/models/index';
import { I18N, StatusCodes } from '#src/i18n/index';
import { logger, removeQueryString } from '#src/functions/index';

export function timer() {
  return async function( ctx: Context, next: Next ) {
    const path = removeQueryString( ctx.url );

    console.time( path );
    await next();
    console.timeEnd( path );
  };
}

export function handleResponse() {
  return async function( ctx: Context, next: Next ) {
    const responseHttp = new ResponseHttp();

    try {
      const data = await next();
      responseHttp.handleSuccess( data );
    } catch ( err: unknown ) {
      const error = err as ErrorHttp;
      logger( 'error', { error, url: ctx.url } );
      responseHttp.handleError( error );
    } finally {
      ctx.status = responseHttp.statusCode;
      ctx.body = responseHttp.toJSON();
    }
  };
}

export function handle404() {
  return async function( ctx: Context ) {
    const responseHttp = new ResponseHttp();
    const statusCode = STATUS_CODES.NOT_FOUND as StatusCodes;

    responseHttp.statusCode = statusCode;
    responseHttp.message = `${ ctx.method } - ${ ctx.url } ${ I18N.STATUS_CODES[ statusCode ] }`;

    ctx.status = responseHttp.statusCode;
    ctx.body = responseHttp.toJSON();
  };
}
