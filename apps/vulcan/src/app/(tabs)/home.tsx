import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

export default function Home() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Hello World</Text>
    </SafeAreaView>
  );
}
