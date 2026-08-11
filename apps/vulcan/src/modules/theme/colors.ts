export const colors = {
  bg: '#161826',
  surface: '#232532',
  text: '#e9e9ed',
  tabBarActive: '#B5ABFC',
  tabBarInactive: '#73747C',
  border: '#2B2D39',
} as const;

export type ColorName = keyof typeof colors;
