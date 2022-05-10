// https://stackoverflow.com/questions/60067281/typescript-path-aliases-not-resolved-correctly-at-runtime
import 'dotenv/config';
import Koa from 'koa';
import fs from 'node:fs';
import http2 from 'node:http2';
import next from 'next';

import * as ENV from '@server/config/index';
import { logger } from '@server/functions/index';
import { routerRoot } from '@server/routes/index';
import { handle404, handleResponse, timer } from '@server/middlewares/index';

if ( !ENV.SSL_CERT_PATH || !ENV.SSL_KEY_PATH ) throw new Error( 'SSL_CERT_PATH and SSL_KEY_PATH must be set in the environment' );

const dev = process.env.NODE_ENV !== 'production';
const appNext = next( { dev, dir: '.' } );
const handle = appNext.getRequestHandler();
const serverKoa = new Koa();
const http2ServerOpts: http2.SecureServerOptions = {
  key: fs.readFileSync( ENV.SSL_KEY_PATH ),
  cert: fs.readFileSync( ENV.SSL_CERT_PATH ),
  allowHTTP1: true,
};

appNext.prepare()
  .then( () => {
    // router.all( '(.*)', async ctx => {
    //   await handle( ctx.req, ctx.res );
    //   // eslint-disable-next-line require-atomic-updates
    //   ctx.respond = false;
    // } );

    routerRoot.all( '(.*)', async ctx => {
      await handle( ctx.req, ctx.res );
      // eslint-disable-next-line require-atomic-updates
      ctx.respond = false;
    } );

    serverKoa
      .use( timer() )
      .use( handleResponse() )
      .use( routerRoot.routes() )
      .use( handle404() );

    http2
      .createSecureServer( http2ServerOpts, serverKoa.callback() )
      .listen( ENV.PORT ?? 3000, () => logger( 'info', `Listening on https://${ ENV.HOST }:${ ENV.PORT }` ) );
  } );

export {
  appNext,
  serverKoa,
};
