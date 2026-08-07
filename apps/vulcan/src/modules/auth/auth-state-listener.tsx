import { useConvexAuth } from '@convex-dev/auth/react';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { enableTransitionAnimations } from '../navigation/transition-animations';

export function AuthStateListener() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const hasRoutedInitially = useRef(false);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      router.replace('/(tabs)/home');
    } else {
      router.replace('/auth/email');
    }

    if (!hasRoutedInitially.current) {
      hasRoutedInitially.current = true;
      // The initial route must land without animating; only enable
      // animations once it has settled so auth changes animate later.
      setTimeout(enableTransitionAnimations, 300);
    }
  }, [isLoading, isAuthenticated]);

  return null;
}
