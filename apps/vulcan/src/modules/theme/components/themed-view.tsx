import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
  type SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { ColorName } from '../colors';
import { useColors } from '../hooks/use-colors';

type LayoutStyleProps = Pick<
  ViewStyle,
  | 'flex'
  | 'flexGrow'
  | 'flexShrink'
  | 'flexBasis'
  | 'flexDirection'
  | 'flexWrap'
  | 'alignItems'
  | 'alignSelf'
  | 'justifyContent'
  | 'position'
  | 'gap'
  | 'rowGap'
  | 'columnGap'
  | 'width'
  | 'height'
  | 'minWidth'
  | 'minHeight'
  | 'maxWidth'
  | 'maxHeight'
  | 'padding'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingHorizontal'
  | 'paddingVertical'
  | 'margin'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginHorizontal'
  | 'marginVertical'
  | 'borderRadius'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'
  | 'borderWidth'
  | 'borderColor'
  | 'overflow'
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'backgroundColor'
  | 'zIndex'
> & {
  inverse?: boolean;
  transparent?: boolean;
  backgroundColorName?: ColorName;
  borderColorName?: ColorName;
  fullWidth?: boolean;
  withKeyboardAvoidingView?: boolean;
  dismissKeyboardOnTapOutside?: boolean;
};

export type ThemedViewProps = ViewProps & Partial<LayoutStyleProps>;

export function ThemedView({
  style,
  position,
  top,
  left,
  right,
  bottom,
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  flexDirection,
  flexWrap,
  alignItems,
  alignSelf,
  justifyContent,
  gap,
  rowGap,
  columnGap,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginHorizontal,
  marginVertical,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderWidth,
  borderColor,
  transparent,
  backgroundColor,
  backgroundColorName,
  borderColorName,
  overflow,
  fullWidth,
  withKeyboardAvoidingView,
  dismissKeyboardOnTapOutside,
  inverse,
  zIndex,
  children,
  ...otherProps
}: ThemedViewProps) {
  const theme = useColors();
  const layoutStyle: ViewStyle = {
    backgroundColor: backgroundColorName
      ? theme[backgroundColorName]
      : 'transparent',
    position,
    top,
    left,
    right,
    bottom,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    flexDirection,
    flexWrap,
    alignItems,
    alignSelf,
    justifyContent,
    gap,
    rowGap,
    columnGap,
    width,
    ...(fullWidth ? { width: '100%' } : {}),
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingHorizontal,
    paddingVertical,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginHorizontal,
    marginVertical,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderWidth,
    borderColor: borderColorName ? theme[borderColorName] : borderColor,
    overflow,
    zIndex,
  };

  return (
    <View style={[layoutStyle, style]} {...otherProps}>
      {withKeyboardAvoidingView ? (
        <GenericKeyboardAvoidingView
          dismissKeyboardOnTapOutside={dismissKeyboardOnTapOutside}
        >
          {children}
        </GenericKeyboardAvoidingView>
      ) : (
        children
      )}
    </View>
  );
}

export type ThemedSafeAreaViewProps = SafeAreaViewProps &
  Partial<LayoutStyleProps>;

export function ThemedSafeAreaView({
  /** For safe area view, flex will be auto set to 1 if not specified */
  flex,
  style,
  position,
  top,
  left,
  right,
  bottom,
  flexGrow,
  flexShrink,
  flexBasis,
  flexDirection,
  flexWrap,
  alignItems,
  alignSelf,
  justifyContent,
  gap,
  rowGap,
  columnGap,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginHorizontal,
  marginVertical,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderWidth,
  borderColor,
  backgroundColor,
  backgroundColorName,
  borderColorName,
  transparent,
  fullWidth,
  overflow,
  children,
  withKeyboardAvoidingView,
  dismissKeyboardOnTapOutside,
  ...otherProps
}: ThemedSafeAreaViewProps) {
  const colors = useColors();
  const layoutStyle: ViewStyle = {
    backgroundColor: 'transparent',
    ...(fullWidth ? { width: '100%' } : {}),
    ...(flex === undefined ? { flex: 1 } : { flex }),
    position,
    top,
    left,
    right,
    bottom,
    flexGrow,
    flexShrink,
    flexBasis,
    flexDirection,
    flexWrap,
    alignItems,
    alignSelf,
    justifyContent,
    gap,
    rowGap,
    columnGap,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingHorizontal,
    paddingVertical,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginHorizontal,
    marginVertical,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderWidth,
    borderColor: borderColorName ? colors[borderColorName] : borderColor,
    overflow,
  };
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        layoutStyle,
        style,
      ]}
      {...otherProps}
    >
      {withKeyboardAvoidingView ? (
        <GenericKeyboardAvoidingView
          dismissKeyboardOnTapOutside={dismissKeyboardOnTapOutside}
        >
          {children}
        </GenericKeyboardAvoidingView>
      ) : (
        children
      )}
    </View>
  );
}

const GenericKeyboardAvoidingView = ({
  children,
  dismissKeyboardOnTapOutside,
}: ViewProps & { dismissKeyboardOnTapOutside?: boolean }) => {
  const content = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );

  if (!dismissKeyboardOnTapOutside) {
    return content;
  }

  return (
    <Pressable
      accessible={false}
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      {content}
    </Pressable>
  );
};
