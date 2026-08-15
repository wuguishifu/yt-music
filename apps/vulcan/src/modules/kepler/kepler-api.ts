import { keplerRootRouter } from '@libs/contracts-kepler';
import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { QueryClient } from '@tanstack/react-query';
import { initTsrReactQuery } from '@ts-rest/react-query/v5';

import { environment } from '../../env';

export const keplerQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
    },
  },
});

export const queryKeys = createQueryKeyStore({
  search: {
    get: (videoId: string) => ({
      queryKey: [videoId],
    }),
  },
});

export function getKeplerUrl() {
  return environment.KEPLER_BASE_URL;
}

export const keplerApi = initTsrReactQuery(keplerRootRouter, {
  baseUrl: getKeplerUrl(),
});
