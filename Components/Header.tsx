import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}
const Header = ({
  title,
  leftIcon,
  rightIcon,
  onPressLeft,
  onPressRight,
}: HeaderProps) => {
  return (
    <SafeAreaView style={styles.Header}>
      <View style={styles.HeaderLeft}>
        {leftIcon && (
          <TouchableOpacity onPress={onPressLeft}>{leftIcon}</TouchableOpacity>
        )}
      </View>
      <Text style={styles.HeaderTitle}>{title}</Text>
      <View style={styles.HeaderRight}>
        {rightIcon && (
          <TouchableOpacity onPress={onPressRight}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  Header: {
    height: 54,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  HeaderLeft: {
    // backgroundColor:'red',
    height: '100%',
    width: 54,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderRight: {
    // backgroundColor:'blue',
    height: '100%',
    width: 54,
  },
});
