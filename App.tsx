import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';

const stack = createNativeStackNavigator();
function RootLayout () {
  return (
    <stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
      <stack.Screen name="Home" component={HomeScreen} />
      <stack.Screen name="Login" component={LoginScreen} />
      <stack.Screen name="SignUp" component={SignUpScreen} />
    </stack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <RootLayout />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
