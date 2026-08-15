import { c } from '../../contract.ts';

import { youtubeRouter } from './youtube.router.ts';

export const v1Router = c.router(
  {
    youtube: youtubeRouter,
  },
  {
    pathPrefix: '/v1',
  },
);
