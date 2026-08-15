import { StyleProp, TextStyle } from 'react-native';

export const typeScale = {
  h1: {
    fontSize: 42,
    // lineHeight: 1.12 * 16,
    letterSpacing: -0.24,
    fontWeight: 500,
  },
  h2: {
    fontSize: 32,
    // lineHeight: 1.12 * 16,
    letterSpacing: -0.24,
    fontWeight: 500,
  },
  h3: {
    fontSize: 25,
    // lineHeight: 1.12 * 16,
    letterSpacing: -0.24,
    fontWeight: 500,
  },
  h4: {
    fontSize: 20,
    // lineHeight: 1.12 * 16,
    letterSpacing: -0.24,
    fontWeight: 500,
  },
  h5: {
    fontSize: 16,
    // lineHeight: 1.12 * 16,
    letterSpacing: -0.24,
    fontWeight: 500,
  },
  h6: {
    fontSize: 13,
    // lineHeight: 1.12 * 16,
    letterSpacing: 1.28,
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  p: {
    fontSize: 15,
    // lineHeight: 1.55 * 16,
    fontWeight: 400,
  },
  sm: {
    fontSize: 13,
    fontWeight: 400,
  },
  xs: {
    fontSize: 11,
    fontWeight: 400,
  },
} as const satisfies Record<string, StyleProp<TextStyle>>;

export type TypeScale = keyof typeof typeScale;
