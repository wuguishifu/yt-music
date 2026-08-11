import type { Storage } from 'redux-persist';

import { mmkvInstance } from './mmkv-instance';

export const mmkvStorage: Storage = {
  setItem: (key, value) => {
    mmkvInstance.set(key, value);
    return Promise.resolve();
  },
  getItem: (key) => {
    return Promise.resolve(mmkvInstance.getString(key) ?? null);
  },
  removeItem: (key) => {
    mmkvInstance.remove(key);
    return Promise.resolve();
  },
};
