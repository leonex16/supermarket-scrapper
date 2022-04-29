import Router from '@koa/router';
import { routerSupermarket } from '#src/routes/supermarket';

const routerRoot = new Router( { prefix: '/api/v1' } );

routerRoot.use( routerSupermarket.routes() );

export { routerRoot };
