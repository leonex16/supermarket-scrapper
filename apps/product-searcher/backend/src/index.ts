
import { routerRoot } from './routes';
import { serverKoa } from './server';

import { handle404, handleResponse, timer } from './middlewares/index';

serverKoa
  .use( timer() )
  .use( handleResponse() )
  .use( routerRoot.routes() )
  .use( handle404() );
