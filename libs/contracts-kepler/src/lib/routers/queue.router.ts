import z from 'zod';
import { c } from '../contract.js';

export const queueRouter = c.router(
  {
    addItem: {
      path: '/',
      method: 'POST',
      body: z.object({
        url: z.url(),
      }),
      responses: {
        200: z.literal('ok'),
      },
    },
    removeItem: {
      path: '/:itemId',
      method: 'DELETE',
      pathParams: z.object({
        itemId: z.string().min(1),
      }),
      responses: {
        200: z.literal('ok'),
      },
    },
  },
  {
    pathPrefix: '/queue',
  },
);
