import { useAuthActions } from '@convex-dev/auth/react';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authStyles } from '../../modules/auth/auth-styles';
import { PasswordInput } from '../../modules/auth/password-input';

const MIN_PASSWORD_LENGTH = 8;

export default function SignUpScreen() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!email) {
    return <Redirect href="/auth/email" />;
  }

  const canSubmit =
    name.trim().length > 0 && password.length >= MIN_PASSWORD_LENGTH;

  const handleChangeEmail = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/auth/email');
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit || submitting) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await signIn('password', {
        email,
        password,
        name: name.trim(),
        flow: 'signUp',
      });
    } catch {
      setError('Could not create account. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <KeyboardAvoidingView
        style={authStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={authStyles.form}>
          <Text style={authStyles.title}>Create account</Text>
          <View style={authStyles.emailRow}>
            <Text style={authStyles.emailText} numberOfLines={1}>
              {email}
            </Text>
            <Pressable onPress={handleChangeEmail} hitSlop={8}>
              <Text style={authStyles.link}>Change</Text>
            </Pressable>
          </View>
          <TextInput
            style={authStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
            autoFocus
            editable={!submitting}
          />
          <PasswordInput
            value={password}
            onChangeText={setPassword}
            autoComplete="new-password"
            textContentType="newPassword"
            editable={!submitting}
            onSubmitEditing={handleSubmit}
          />
          <Text style={authStyles.subtitle}>
            Password must be at least {MIN_PASSWORD_LENGTH} characters.
          </Text>
          {error && <Text style={authStyles.error}>{error}</Text>}
          <Pressable
            style={({ pressed }) => [
              authStyles.button,
              (!canSubmit || submitting) && authStyles.buttonDisabled,
              pressed && authStyles.buttonPressed,
            ]}
            onPress={handleSubmit}
            disabled={!canSubmit || submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={authStyles.buttonText}>Create account</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
