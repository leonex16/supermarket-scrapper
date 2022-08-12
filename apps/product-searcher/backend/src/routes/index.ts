/* eslint-disable import/order */
import Router from '@koa/router';

import { routerHealth } from './health.routes';
import { routerSupermarket } from './supermarket.routes';

const routerRoot = new Router( { prefix: '/api/v1' } );

routerRoot.use( routerHealth.routes() );
routerRoot.use( routerSupermarket.routes() );

export { routerRoot };
