import Koa from 'koa';
import fs from 'node:fs';
import http2 from 'node:http2';

import { logger } from '#src/functions/index';
import {
  HOST, PORT, SSL_CERT_PATH, SSL_KEY_PATH,
} from '#src/config/index';

if ( !SSL_CERT_PATH || !SSL_KEY_PATH ) throw new Error( 'SSL_CERT_PATH and SSL_KEY_PATH must be set in the environment' );

const app = new Koa();
const http2ServerOpts: http2.SecureServerOptions = {
  key: fs.readFileSync( SSL_KEY_PATH ),
  cert: fs.readFileSync( SSL_CERT_PATH ),
  allowHTTP1: true,
};

http2
  .createSecureServer( http2ServerOpts, app.callback() )
  .listen( PORT, () => logger( 'info', `Listening on https://${ HOST }:${ PORT }` ) );

export { app };
