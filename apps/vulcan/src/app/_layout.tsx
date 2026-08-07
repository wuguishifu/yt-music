import { Tabs, ThemeProvider, useTheme } from 'expo-router';
import { Home } from 'lucide-react-native';

export default function RootLayout() {
  const navigationTheme = useTheme();

  return (
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
  );
}
