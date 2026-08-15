import { c } from './contract.ts';
import { v1Router } from './routers/v1/index.ts';

export const keplerRootRouter = c.router(
  {
    v1: v1Router,
  },
  {
    pathPrefix: '/api',
    strictStatusCodes: true,
  },
);
