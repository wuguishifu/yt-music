export const colors = {
  bg: '#161826',
  surface: '#232532',
  text: '#e9e9ed',
  textSecondary: '#8A8B93',
  textMuted: '#6A6B76',
  tabBarActive: '#B5ABFC',
  tabBarInactive: '#73747C',
  border: '#2B2D39',
  highlight: '#9184D9',
  glow: '#26263D',
} as const;

export type ColorName = keyof typeof colors;
