import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { ConvexQueryCacheProvider } from 'convex-helpers/react/cache';
import { Stack, ThemeProvider, useTheme } from 'expo-router';
import { convexClient } from '../modules/apollo/convex-client';
import { convexTokenStorage } from '../modules/apollo/convex-token-storage';
import { useTransitionAnimationsEnabled } from '../modules/navigation/transition-animations';
import { ImmediateFeatures } from '../modules/startup/immediate-features';

export default function RootLayout() {
  const navigationTheme = useTheme();
  const animationsEnabled = useTransitionAnimationsEnabled();
  const animation = animationsEnabled ? 'default' : 'none';

  return (
    <ConvexAuthProvider client={convexClient} storage={convexTokenStorage}>
      <ConvexQueryCacheProvider>
        <ThemeProvider value={navigationTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ animation: 'none' }} />
            <Stack.Screen
              name="auth"
              options={{ animation, animationTypeForReplace: 'pop' }}
            />
            <Stack.Screen name="(tabs)" options={{ animation }} />
          </Stack>
        </ThemeProvider>
        <ImmediateFeatures />
      </ConvexQueryCacheProvider>
    </ConvexAuthProvider>
  );
}
