import z from 'zod';
import { c } from '../../contract.js';

export const youtubeRouter = c.router(
  {
    resolve: {
      path: '/resolve',
      method: 'GET',
      query: z.object({
        url: z.url(),
      }),
      responses: {
        200: z.object({
          streamUrl: z.url(),
        }),
      },
    },
  },
  {
    pathPrefix: '/youtube',
  },
);
