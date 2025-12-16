import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../Screens/HomeScreen';   // FIXED PATH
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import { AppStack } from './AppStack';
import StarterScreen from '../Screens/StarterScreen';
import BottomTabs from './BottomTabs';
import QuizScreen from '../Screens/QuizScreen';
import QuizResultScreen from '../Screens/QuizResultScreen';

export type AuthStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  App: undefined;
  Starter: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Starter" component={StarterScreen} />
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="App" component={BottomTabs} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="QuizResult" component={QuizResultScreen} />
    
    </Stack.Navigator>
  );
}
