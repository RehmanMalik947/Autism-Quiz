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
  OnPress?:()=>void,
  defaultWidth?:string
}

const Button = ({ ButtonText, style, TextColor, ButtonBg,OnPress,defaultWidth }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[ButtonStyles.btn, style, { backgroundColor: ButtonBg }]}
      onPress={OnPress}
    >
      <Text style={{ color: TextColor ,fontWeight:'bold',fontSize:16}}>{ButtonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const ButtonStyles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: RADIUS.sm,
    
  },
});
