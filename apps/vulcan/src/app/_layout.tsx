import { ConvexQueryCacheProvider } from 'convex-helpers/react/cache';
import { ConvexProvider } from 'convex/react';
import { Tabs, ThemeProvider, useTheme } from 'expo-router';
import { Home } from 'lucide-react-native';
import { convexClient } from '../modules/apollo/convex-client';

export default function RootLayout() {
  const navigationTheme = useTheme();

  return (
    <ConvexProvider client={convexClient}>
      <ConvexQueryCacheProvider>
        <ThemeProvider value={navigationTheme}>
          <Tabs screenOptions={{ headerShown: false }} initialRouteName="index">
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <Home color={color} />,
              }}
            />
          </Tabs>
        </ThemeProvider>
      </ConvexQueryCacheProvider>
    </ConvexProvider>
  );
}
