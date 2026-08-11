import { ConvexQueryCacheProvider } from 'convex-helpers/react/cache';
import { ConvexProvider } from 'convex/react';
import { Tabs, ThemeProvider, useTheme } from 'expo-router';
import { BottomTabBar } from 'expo-router/build/react-navigation/bottom-tabs';
import { LibraryBig, ListMusic, Search, Settings } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { convexClient } from '../modules/apollo/convex-client';
import { MiniPlayer } from '../modules/mini-player/components/mini-player';
import { persistor, store } from '../modules/storage/store';
import { useColors } from '../modules/theme/hooks/use-colors';

export default function RootLayout() {
  const navigationTheme = useTheme();
  const colors = useColors();

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConvexProvider client={convexClient}>
          <ConvexQueryCacheProvider>
            <ThemeProvider value={navigationTheme}>
              <View style={StyleSheet.absoluteFill}>
                <Tabs
                  screenOptions={{
                    headerShown: false,
                    sceneStyle: {
                      backgroundColor: colors.bg,
                    },
                    tabBarStyle: {
                      backgroundColor: colors.surface,
                      borderTopColor: colors.border,
                      borderTopWidth: 1.5,
                      paddingTop: 4,
                    },
                    tabBarActiveTintColor: colors.tabBarActive,
                    tabBarInactiveTintColor: colors.tabBarInactive,
                    tabBarIconStyle: {
                      marginBottom: 4,
                    },
                  }}
                  tabBar={(props) => (
                    <>
                      <MiniPlayer />
                      <BottomTabBar {...props} />
                    </>
                  )}
                  initialRouteName="index"
                >
                  <Tabs.Screen
                    name="index"
                    options={{
                      title: 'Library',
                      tabBarIcon: ({ color }) => <LibraryBig color={color} />,
                    }}
                  />
                  <Tabs.Screen
                    name="search"
                    options={{
                      title: 'Search',
                      tabBarIcon: ({ color }) => <Search color={color} />,
                    }}
                  />
                  <Tabs.Screen
                    name="playlists"
                    options={{
                      title: 'Playlists',
                      tabBarIcon: ({ color }) => <ListMusic color={color} />,
                    }}
                  />
                  <Tabs.Screen
                    name="settings"
                    options={{
                      title: 'Settings',
                      tabBarIcon: ({ color }) => <Settings color={color} />,
                    }}
                  />
                </Tabs>
              </View>
            </ThemeProvider>
          </ConvexQueryCacheProvider>
        </ConvexProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
