// src/Components/InputBox.tsx
import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../Constants/Constants';

interface InputBoxProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const InputBox: React.FC<InputBoxProps> = ({
  containerStyle,
  style,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...rest}
        style={[styles.input, style]}
        placeholderTextColor="#999"
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.secondary ?? '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default InputBox;
