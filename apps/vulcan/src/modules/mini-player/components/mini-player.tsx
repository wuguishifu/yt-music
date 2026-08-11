import { ThemedText } from '../../theme/components/themed-text';
import { ThemedView } from '../../theme/components/themed-view';

export function MiniPlayer() {
  return (
    <ThemedView
      height={32}
      width="100%"
      alignItems="center"
      justifyContent="center"
      backgroundColorName="surface"
    >
      <ThemedText>Hello World</ThemedText>
    </ThemedView>
  );
}
