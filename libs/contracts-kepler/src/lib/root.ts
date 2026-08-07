import { c } from './contract.js';
import { v1Router } from './routers/v1/index.js';

export const keplerRootRouter = c.router(
  {
    v1: v1Router,
  },
  {
    pathPrefix: '/api',
    strictStatusCodes: true,
  },
);
