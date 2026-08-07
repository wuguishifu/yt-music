import { TokenStorage } from '@convex-dev/auth/react';
import { mmkvInstance } from '../storage/mmkv-instance';

export const convexTokenStorage: TokenStorage = {
  getItem: (k) => mmkvInstance.getString(k),
  setItem: (k, v) => mmkvInstance.set(k, v),
  removeItem: (k) => void mmkvInstance.remove(k),
};
