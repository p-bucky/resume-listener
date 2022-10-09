import React, {FC} from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '@assets/theme/color';

export enum ButtonType {
  primary = 'PRIMARY',
  secondary = 'SECONDARY',
  transparent = 'TRANSPARENT',
}

interface CButtonProps {
  type: ButtonType;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const getButtonTypeStyle = (type: string) => {
  let style = styles.buttonPrimary;
  if (type === 'PRIMARY') {
    style = styles.buttonPrimary;
  } else if (type === 'SECONDARY') {
    style = styles.buttonSeconday;
  } else if (type === 'TRANSPARENT') {
    style = styles.buttonTransparent;
  }
  return style;
};

export const CButton: FC<CButtonProps> = ({
  type,
  label,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.button, style, getButtonTypeStyle(type)]}>
      <Pressable onPress={onPress}>
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    borderColor: colors.primary
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSeconday: {
    backgroundColor: colors.white,
  },
  buttonTransparent: {
    borderWidth: 0,
    backgroundColor: colors.white,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    color: colors.black,
    fontWeight: '700',
    letterSpacing: 1.2,
    fontSize: 16,
    alignSelf: 'center',
  },
});
