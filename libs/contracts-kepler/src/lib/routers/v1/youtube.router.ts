import z from 'zod';

import { c } from '../../contract.ts';
import { youtubeMetadataSchema } from '../../types/youtube.ts';

export const youtubeRouter = c.router(
  {
    getMetadata: {
      path: '/metadata',
      method: 'GET',
      query: z.object({
        url: z.url(),
        includeStreamUrl: z.coerce.boolean().optional(),
      }),
      responses: {
        200: youtubeMetadataSchema,
      },
    },
    getStreamUrl: {
      path: '/stream-url',
      method: 'GET',
      query: z.object({
        url: z.url(),
      }),
      responses: {
        200: z.string(),
      },
    },
  },
  {
    pathPrefix: '/youtube',
  },
);
