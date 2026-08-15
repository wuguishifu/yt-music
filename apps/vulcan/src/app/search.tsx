import { YoutubeMetadata } from '@libs/contracts-kepler';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Image } from 'expo-image';
import { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import z from 'zod';

import { Search } from '../components/search';
import { keplerApi } from '../modules/kepler/kepler-api';
import { PlayButton } from '../modules/player/components/play-button';
import { ThemedText } from '../modules/theme/components/themed-text';
import {
  ThemedSafeAreaView,
  ThemedView,
} from '../modules/theme/components/themed-view';
import { secondsToTimestamp } from '../modules/player/lib/seconds-to-timestamp';

// (https://www.youtube.com/watch?v=atgjKEgSqSU&list=RDatgjKEgSqSU&start_radio=1)

export default function SearchScreen() {
  const player = useAudioPlayer(null, { updateInterval: 250 });
  const status = useAudioPlayerStatus(player);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<YoutubeMetadata>();

  const onSubmit = async (value: string) => {
    const parsedUrl = z.url().safeParse(value);
    if (!parsedUrl.success) return;

    setLoading(true);
    setResult(undefined);
    try {
      const result = await keplerApi.v1.youtube.getMetadata.query({
        query: { includeStreamUrl: true, url: parsedUrl.data },
      });

      if (result.status !== 200) return console.log('non 200');

      setResult(result.body);

      if (!result.body.stream_url) return console.log('not stream url');
      player.pause();
      player.replace({ uri: result.body.stream_url });
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePlayback = (nextState: boolean) => {
    if (nextState) {
      player.play();
    } else {
      player.pause();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedSafeAreaView edges={['top']}>
        <ThemedText type="h2">Search</ThemedText>
        <Search onSubmit={onSubmit} style={{ marginTop: 16 }} />
        {loading && (
          <ThemedView flex={1} alignItems="center" justifyContent="center">
            <ActivityIndicator />
          </ThemedView>
        )}
        {result && (
          <ThemedView flex={1} alignItems="center" marginTop={32}>
            <Image
              source={{ uri: result.thumbnail }}
              style={{ width: '80%', aspectRatio: 1 }}
            />
            <ThemedText marginTop={16} type="h5" textAlign="center">
              {result.title}
            </ThemedText>
            <ThemedText
              marginTop={8}
              type="p"
              textAlign="center"
              colorName="textSecondary"
            >
              {result.uploader} • {result.duration_string}
            </ThemedText>
            <ThemedView marginTop={32}>
              <ThemedText>
                {secondsToTimestamp(status.currentTime)} /{' '}
                {secondsToTimestamp(status.duration)}
              </ThemedText>
            </ThemedView>
            <ThemedView
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              marginTop={32}
            >
              <PlayButton onPress={handleTogglePlayback} />
            </ThemedView>
          </ThemedView>
        )}
      </ThemedSafeAreaView>
    </TouchableWithoutFeedback>
  );
}
