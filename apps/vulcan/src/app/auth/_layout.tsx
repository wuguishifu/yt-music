import { Stack } from 'expo-router';

export default function AuthStack() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="email">
      <Stack.Screen name="email" />
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
