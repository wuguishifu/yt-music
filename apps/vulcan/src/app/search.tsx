import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Search } from '../components/search';
import { ThemedText } from '../modules/theme/components/themed-text';
import { ThemedSafeAreaView } from '../modules/theme/components/themed-view';

export default function SearchScreen() {
  const [query, setQuery] = useState<string>('');

  const debouncedSearch = useRef(
    _.debounce((query: string) => {
      if (!query.trim()) return;
      console.log(query);
    }, 500),
  );

  useEffect(() => {
    debouncedSearch.current(query);
  }, [query]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedSafeAreaView edges={['top']}>
        <ThemedText type="h2">Search</ThemedText>
        <Search onValueChange={setQuery} style={{ marginTop: 16 }} />
      </ThemedSafeAreaView>
    </TouchableWithoutFeedback>
  );
}
