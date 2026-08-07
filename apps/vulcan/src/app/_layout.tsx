import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { ConvexQueryCacheProvider } from 'convex-helpers/react/cache';
import { Stack, ThemeProvider, useTheme } from 'expo-router';
import { convexClient } from '../modules/apollo/convex-client';
import { convexTokenStorage } from '../modules/apollo/convex-token-storage';
import { ImmediateFeatures } from '../modules/startup/immediate-features';

export default function RootLayout() {
  const navigationTheme = useTheme();

  return (
    <ConvexAuthProvider client={convexClient} storage={convexTokenStorage}>
      <ConvexQueryCacheProvider>
        <ThemeProvider value={navigationTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ animation: 'none' }} />
            <Stack.Screen name="auth" options={{ animation: 'none' }} />
          </Stack>
        </ThemeProvider>
        <ImmediateFeatures />
      </ConvexQueryCacheProvider>
    </ConvexAuthProvider>
  );
}
