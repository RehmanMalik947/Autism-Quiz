import { StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import React from 'react';
import { RADIUS } from '../Constants/Constants';

interface InputProps {
  placeholder?: string;
  bgColor?: string;
  style?: ViewStyle;
}
const InputBox = ({ placeholder, bgColor, style }: InputProps) => {
  return (
    <TextInput
      style={[TextInputStyles.input, style, { backgroundColor: bgColor }]}
      placeholder={placeholder}
    ></TextInput>
  );
};

export default InputBox;

const TextInputStyles = StyleSheet.create({
  input: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 54,
    borderRadius: RADIUS.sm,
    padding:16
  },
});
