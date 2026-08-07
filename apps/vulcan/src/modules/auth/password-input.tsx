import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

export function PasswordInput(props: TextInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={!visible}
        autoCapitalize="none"
        autoComplete="password"
        textContentType="password"
        {...props}
      />
      <Pressable
        style={styles.toggle}
        onPress={() => setVisible((v) => !v)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? (
          <EyeOff size={20} color="#666666" />
        ) : (
          <Eye size={20} color="#666666" />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  toggle: {
    paddingHorizontal: 12,
  },
});
