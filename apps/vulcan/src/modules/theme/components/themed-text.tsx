import { Text, TextStyle, type TextProps } from 'react-native';

import { ColorName } from '../colors';
import { useColors } from '../hooks/use-colors';
import { typeScale, TypeScale } from '../type-scale';

export type ThemedTextProps = TextProps & {
  type?: TypeScale;
  centered?: boolean;
  color?: string;
  colorName?: ColorName;
} & Pick<
    TextStyle,
    | 'fontSize'
    | 'lineHeight'
    | 'padding'
    | 'paddingTop'
    | 'paddingBottom'
    | 'paddingHorizontal'
    | 'paddingVertical'
    | 'paddingLeft'
    | 'paddingRight'
    | 'textDecorationLine'
    | 'maxWidth'
    | 'marginTop'
    | 'marginBottom'
    | 'marginStart'
    | 'marginEnd'
    | 'marginLeft'
    | 'marginRight'
    | 'marginVertical'
    | 'marginHorizontal'
    | 'flex'
    | 'textAlign'
    | 'alignSelf'
    | 'flexShrink'
  >;

export function ThemedText({
  type = 'p',
  flex,
  style,
  centered,
  color,
  colorName,
  textDecorationLine,
  fontSize,
  lineHeight,
  padding,
  paddingTop,
  paddingBottom,
  paddingHorizontal,
  paddingVertical,
  paddingLeft,
  paddingRight,
  maxWidth,
  marginTop,
  marginBottom,
  marginStart,
  marginEnd,
  marginLeft,
  marginRight,
  marginVertical,
  marginHorizontal,
  textAlign,
  alignSelf,
  flexShrink,
  ...rest
}: ThemedTextProps) {
  const colors = useColors();
  const textColor = color ?? (colorName ? colors[colorName] : colors.text);

  const inlineTextStyle: TextStyle = {
    ...(textDecorationLine && { textDecorationLine }),
    flex,
    maxWidth,
    padding,
    paddingTop,
    paddingBottom,
    paddingHorizontal,
    paddingVertical,
    paddingLeft,
    paddingRight,
    fontSize,
    lineHeight,
    marginTop,
    marginBottom,
    marginStart,
    marginEnd,
    marginLeft,
    marginRight,
    marginVertical,
    marginHorizontal,
    textAlign,
    alignSelf,
    flexShrink,
  };

  return (
    <Text
      {...rest}
      style={[
        inlineTextStyle,
        { color: textColor },
        centered ? { textAlign: 'center' } : undefined,
        type ? typeScale[type] : {},
        fontSize ? { fontSize } : {},
        lineHeight ? { lineHeight } : {},
        style,
      ]}
    />
  );
}
