import { c } from '../../contract.js';
import { youtubeRouter } from './youtube.router.js';

export const v1Router = c.router(
  {
    youtube: youtubeRouter,
  },
  {
    pathPrefix: '/v1',
  },
);
