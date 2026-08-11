import { SearchIcon, XIcon } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Pressable, StyleProp, TextInput, ViewStyle } from 'react-native';

import { ThemedView } from '../modules/theme/components/themed-view';
import { useColors } from '../modules/theme/hooks/use-colors';
import { typeScale } from '../modules/theme/type-scale';

type SearchProps = {
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function Search({ onValueChange, style }: SearchProps) {
  const [focused, setFocused] = useState(false);
  const colors = useColors();
  const textInputRef = useRef<TextInput>(null);

  const handleClear = () => {
    onValueChange('');
    textInputRef.current?.clear();
    textInputRef.current?.focus();
  };

  return (
    <ThemedView
      bg="surface"
      flexDirection="row"
      alignItems="center"
      paddingHorizontal={16}
      style={style}
      borderWidth={1}
      borderColorName={focused ? 'highlight' : 'surface'}
      borderRadius={16}
      gap={8}
    >
      <SearchIcon color={colors.textMuted} />
      <TextInput
        ref={textInputRef}
        onChangeText={onValueChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          flexShrink: 1,
          color: colors.text,
          paddingVertical: 12,
          fontSize: typeScale.p.fontSize,
        }}
        placeholder="name or youtube link"
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Pressable onPress={handleClear}>
        <XIcon color={colors.textMuted} />
      </Pressable>
    </ThemedView>
  );
}
