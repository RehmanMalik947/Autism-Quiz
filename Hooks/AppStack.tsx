import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ProfileScreen  from '../Screens/ProfileScreen';
import QuizScreen from '../Screens/QuizScreen';
import QuizResultScreen from '../Screens/QuizResultScreen';
import ProfileSettingScreen from '../Screens/ProfileSettingScreen';
import QuizTypeScreen from '../Screens/QuizTypeScreen';
import ResourcesScreen from '../Screens/ResourcesScreen';
export type AppStackParamList = {
  Tabs: undefined;
  Profile: undefined;
  Quiz: undefined;
  QuizResult: undefined;
  ProfileSetting: undefined;
  QuizType: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Profile">
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="QuizType" component={QuizTypeScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="QuizResult" component={QuizResultScreen} />
      <Stack.Screen name="ProfileSetting" component={ProfileSettingScreen} />
      <Stack.Screen name="Resources" component={ResourcesScreen} />
    </Stack.Navigator>
  );
}