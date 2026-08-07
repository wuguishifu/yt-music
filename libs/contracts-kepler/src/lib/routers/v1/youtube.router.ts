import z from 'zod';
import { c } from '../../contract.js';
import { youtubeTrackSchema } from '../../types/youtube.js';

export const youtubeRouter = c.router(
  {
    resolve: {
      path: '/resolve',
      method: 'GET',
      query: z.object({
        url: z.url(),
      }),
      responses: {
        200: youtubeTrackSchema,
      },
    },
  },
  {
    pathPrefix: '/youtube',
  },
);
