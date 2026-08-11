import {
  ThemedSafeAreaView,
  ThemedView,
} from '../modules/theme/components/themed-view';

export default function Search() {
  return (
    <ThemedSafeAreaView edges={['top']}>
      <ThemedView
        borderWidth={1}
        width="100%"
        flex={1}
        borderColor="white"
      ></ThemedView>
    </ThemedSafeAreaView>
  );
}
