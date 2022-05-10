/* eslint-disable require-atomic-updates */

import { app } from '#src/server/index';
import { routerRoot } from '#src/routes/index';
import { handle404, handleResponse, timer } from '#src/middlewares/index';

app
  .use( timer() )
  .use( handleResponse() )
  .use( routerRoot.routes() )
  .use( handle404() );
