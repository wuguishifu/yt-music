import { Pause, Play } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable } from 'react-native';

import { ThemedView } from '../../theme/components/themed-view';
import { useColors } from '../../theme/hooks/use-colors';

type PlayButtonProps = {
  onPress: (nextState: boolean) => void;
  initialState?: boolean;
};

export function PlayButton({ onPress, initialState = false }: PlayButtonProps) {
  const [playing, setPlaying] = useState(initialState);
  const colors = useColors();

  const iconProps = useMemo(
    () => ({
      color: colors.highlight,
    }),
    [colors],
  );

  const handlePress = () => {
    const nextState = !playing;
    setPlaying(nextState);
    onPress(nextState);
  };

  return (
    <Pressable onPress={handlePress}>
      <ThemedView
        size={64}
        alignItems="center"
        justifyContent="center"
        borderWidth={2}
        borderColorName="highlight"
        borderRadius={32}
      >
        {playing ? <Pause {...iconProps} /> : <Play {...iconProps} />}
      </ThemedView>
    </Pressable>
  );
}
