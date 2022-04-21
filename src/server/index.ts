import {OAK} from '../../dependencies.ts';
import { HOST, PORT } from '../config/index.ts'

const app = new OAK.Application();

app.use( async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get('X-Response-Time');
})

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

console.log(`Welcome API Deno :) ${HOST}:${PORT}...`);

await app.listen(`${HOST}:${PORT}`);