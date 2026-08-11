import { StyleSheet } from 'react-native';

import { ThemedText } from '../modules/theme/components/themed-text';
import { ThemedSafeAreaView } from '../modules/theme/components/themed-view';

export default function Playlists() {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText>Playlists</ThemedText>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
});
