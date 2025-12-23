import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './Hooks/AuthStack';
import { AppStack } from './Hooks/AppStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = async () => {
      // Example: check AsyncStorage for user token
      // const token = await AsyncStorage.getItem('userToken');
      const token = false; // temporary
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
    </SafeAreaProvider> 
     );
}


// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import BottomTabs from './Hooks/BottomTabs';
// import HomeScreen from './Screens/HomeScreen';
// import LoginScreen from './Screens/LoginScreen';
// import SignUpScreen from './Screens/SignUpScreen';
// import ProfileScreen  from './Screens/ProfileScreen';
// import QuizTypeScreen from './Screens/QuizTypeScreen';
// import QuizScreen from './Screens/QuizScreen';
// import QuizResultScreen from './Screens/QuizResultScreen';
// import ResourcesScreen from './Screens/ResourcesScreen';
// import ProfileSettingScreen from './Screens/ProfileSettingScreen';



// const stack = createNativeStackNavigator();
// function RootLayout () {
//   return (
//     <stack.Navigator initialRouteName="Tabs" screenOptions={{headerShown:false}}>

//       <stack.Screen name="Tabs" component={BottomTabs} />
//       <stack.Screen name="Home" component={HomeScreen} />
//       <stack.Screen name="Login" component={LoginScreen} />
//       <stack.Screen name="SignUp" component={SignUpScreen} />
//       <stack.Screen name="Profile" component={ProfileScreen} />
//       <stack.Screen name="QuizType" component={QuizTypeScreen} />
//       <stack.Screen name="Quiz" component={QuizScreen} />
//       <stack.Screen name="QuizResult" component={QuizResultScreen} />
//       <stack.Screen name="Resources" component={ResourcesScreen} />
//       <stack.Screen name="ProfileSetting" component={ProfileSettingScreen}/>
//     </stack.Navigator>
//   );
// };
// const App = () => {
//   return (
//     <NavigationContainer>
//       <RootLayout />
//     </NavigationContainer>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});

