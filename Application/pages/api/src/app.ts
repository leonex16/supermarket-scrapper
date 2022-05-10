/* eslint-disable import/order */
import { routerRoot } from '@server/routes/index';
import { serverKoa } from '@/server';

import { handle404, handleResponse, timer } from '@server/middlewares/index';

serverKoa
  .use( timer() )
  .use( handleResponse() )
  .use( routerRoot.routes() )
  .use( handle404() );
