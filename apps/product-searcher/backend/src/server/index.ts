// https://stackoverflow.com/questions/60067281/typescript-path-aliases-not-resolved-correctly-at-runtime
import 'dotenv/config';

import Koa from 'koa';

import fs from 'node:fs';
import http2 from 'node:http2';
import path from 'node:path';

import * as ENV from '../config/index';
import { LoggerConsole } from '../../../../../src/product-searcher/shared/infrastructure/logger-console-logger';

if ( !ENV.SSL_CERT_PATH || !ENV.SSL_KEY_PATH ) throw new Error( 'SSL_CERT_PATH and SSL_KEY_PATH must be set in the environment' );

const logger = new LoggerConsole();
const serverKoa = new Koa();
const http2ServerOpts: http2.SecureServerOptions = {
  key: fs.readFileSync( path.join( __dirname, ENV.SSL_KEY_PATH ) ),
  cert: fs.readFileSync( path.join( __dirname, ENV.SSL_CERT_PATH ) ),
  allowHTTP1: true
};

http2
  .createSecureServer( http2ServerOpts, serverKoa.callback() )
  .listen( ENV.PORT, () => logger.log( `Listening on https://${ ENV.HOST }:${ ENV.PORT }` ) );

export {
  serverKoa
};
