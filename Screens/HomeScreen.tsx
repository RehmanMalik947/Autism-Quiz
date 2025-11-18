import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import {
  COLORS,
  FONTSIZES,
  FONTWEIGHTS,
  SPACING,
} from '../Constants/Constants';
import Button from '../Components/Button';
import Spacer from '../Components/Spacer';
import { useTypedNavigation } from '../Hooks/useTypedNavigation';

const HomeScreen = () => {
  const navigation = useTypedNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title="Autism Quiz"
      />
      <View style={styles.container}>
      <Spacer/>
        <Text numberOfLines={2} style={styles.Heading}>
          Welcome to the Autism Quiz
        </Text>
       <Spacer/>
        <Text numberOfLines={4} style={styles.subHeading}>
          This quiz is designed to understand if you might have any traits
          assosiated to autism.It's not a diagnostic tool but it can be helpful
          straight point.{' '}
        </Text>
       <Spacer/>
        <View style={styles.btnContainer}>
          <Button
            ButtonText="Login"
            TextColor="white"
            ButtonBg={COLORS.primary}
            style={{width:'90%'}}
            OnPress={()=>navigation.navigate('Login')}
          />
          <Button ButtonText="Sign Up" ButtonBg={COLORS.secondary} style={{width:'90%'}} OnPress={()=>navigation.navigate('SignUp')}/>
          <Button ButtonText="Continue as Guest"  style={{width:'90%'}}/>
        </View>
        <View>
          <Text style={styles.bottomText}>
            By continuing this,you agree to our Terms of Service and Privacy
            Policy.
          </Text>
        </View>
        <Spacer/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  Heading: {
    fontSize: FONTSIZES.h1,
    fontWeight: FONTWEIGHTS.bold,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  subHeading: {
    textAlign: 'center',
    fontSize: FONTSIZES.h4,
    lineHeight: FONTSIZES.h2,
    marginHorizontal: SPACING.xxl,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    rowGap: SPACING.lg,
  },
  bottomText: {
    textAlign: 'center',
    fontSize:16,
    paddingHorizontal: 16,
  },
});
