import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import z from 'zod';
import { YoutubeMetadata } from '@libs/contracts-kepler';

import { Search } from '../components/search';
import { keplerApi } from '../modules/kepler/kepler-api';
import { ThemedText } from '../modules/theme/components/themed-text';
import { ThemedSafeAreaView } from '../modules/theme/components/themed-view';

// (https://www.youtube.com/watch?v=atgjKEgSqSU&list=RDatgjKEgSqSU&start_radio=1)

export default function SearchScreen() {
  const [result, setResult] = useState<YoutubeMetadata>();

  const onSubmit = async (value: string) => {
    const parsedUrl = z.url().safeParse(value);
    if (!parsedUrl.success) return;

    const result = await keplerApi.v1.youtube.getMetadata.query({
      query: { includeStreamUrl: true, url: parsedUrl.data },
    });

    if (result.status === 200) setResult(result.body);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedSafeAreaView edges={['top']}>
        <ThemedText type="h2">Search</ThemedText>
        <Search onSubmit={onSubmit} style={{ marginTop: 16 }} />
        <ThemedText>{JSON.stringify(result, null, 2)}</ThemedText>
      </ThemedSafeAreaView>
    </TouchableWithoutFeedback>
  );
}
