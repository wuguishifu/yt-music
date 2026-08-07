import { useConvexAuth } from '@convex-dev/auth/react';
import { router } from 'expo-router';
import { useEffect } from 'react';

export function AuthStateListener() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      router.replace('/(tabs)/home');
      return;
    }

    router.replace('/auth/email');
  }, [isLoading, isAuthenticated]);

  return null;
}
