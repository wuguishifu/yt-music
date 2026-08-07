import { Stack } from 'expo-router';

export default function AuthStack() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="signin">
      <Stack.Screen name="signin" />
    </Stack>
  );
}
