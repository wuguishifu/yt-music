import { c } from './contract.js';

export const rootRouter = c.router(
  {},
  { pathPrefix: '/api', strictStatusCodes: true },
);
