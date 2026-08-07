import { api } from '@libs/apollo-kore/convex/_generated/api';
import { useAction } from 'convex/react';
import { useRouter } from 'expo-router';
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

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export default function EmailScreen() {
  const accountExists = useAction(api.auth.accountExists);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = EMAIL_PATTERN.test(email.trim());

  const handleSubmit = async () => {
    if (!canSubmit || submitting) {
      return;
    }

    setSubmitting(true);
    setError(null);

    const trimmed = email.trim();

    try {
      const exists = await accountExists({ email: trimmed });
      router.push({
        pathname: exists ? '/auth/signin' : '/auth/signup',
        params: { email: trimmed },
      });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
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
          <Text style={authStyles.title}>Welcome</Text>
          <Text style={authStyles.subtitle}>
            Enter your email to sign in or create an account.
          </Text>
          <TextInput
            style={authStyles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus
            editable={!submitting}
            onSubmitEditing={handleSubmit}
          />
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
              <Text style={authStyles.buttonText}>Continue</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
