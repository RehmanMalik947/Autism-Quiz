import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { FONTSIZES, RADIUS, SPACING } from '../Constants/Constants';

interface ButtonProps {
  ButtonText: string;
  ButtonBg?: string;
  style?: ViewStyle | ViewStyle[];
  TextColor?: string;
  OnPress?:()=>void
}

const Button = ({ ButtonText, style, TextColor, ButtonBg,OnPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[ButtonStyles.btn, style, { backgroundColor: ButtonBg }]}
      onPress={OnPress}
    >
      <Text style={{ color: TextColor }}>{ButtonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const ButtonStyles = StyleSheet.create({
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 48,
    borderRadius: RADIUS.sm,
  },
});
