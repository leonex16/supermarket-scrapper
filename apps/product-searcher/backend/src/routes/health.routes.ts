import Router from '@koa/router';

import { version } from '../../package.json';
import { NoContentHttpResponse, OkHttpResponse } from '../models';

const routerHealth = new Router( { prefix: '/health' } );

routerHealth.get( '/', () => new NoContentHttpResponse() );
routerHealth.get( '/version', () => new OkHttpResponse( { version } ) );

export { routerHealth };
