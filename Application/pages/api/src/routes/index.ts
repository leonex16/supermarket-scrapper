/* eslint-disable import/order */
import Router from '@koa/router';

import { routerSupermarket } from '@server/routes/supermarket';

const routerRoot = new Router( { prefix: '/api/v1' } );

routerRoot.use( routerSupermarket.routes() );

export { routerRoot };
