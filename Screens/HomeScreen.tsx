import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/Header';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  COLORS,
  FONTSIZES,
  FONTWEIGHTS,
  SPACING,
} from '../Constants/Constants';
import Button from '../Components/Button';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title="Autism Quiz"
        leftIcon={<ArrowLeft />}
        onPressLeft={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Text numberOfLines={2} style={styles.Heading}>
          Welcome to the Autism Quiz
        </Text>
        <View style={{ height: SPACING.xl }}></View>
        <Text numberOfLines={4} style={styles.subHeading}>
          This quiz is designed to understand if you might have any traits
          assosiated to autism.It's not a diagnostic tool but it can be helpful
          straight point.{' '}
        </Text>
        <View style={{ height: SPACING.xl }}></View>
        <View style={styles.btnContainer}>
          <Button
            ButtonText="Login"
            TextColor="white"
            ButtonBg={COLORS.primary}
          />
          <Button ButtonText="Sign Up" ButtonBg={COLORS.secondary} />
          <Button ButtonText="Continue as Guest" />
        </View>
        <View>
          <Text style={styles.bottomText}>
            By continuing this,you agree to our Terms of Service and Privacy
            Policy.
          </Text>
        </View>
        <View style={{ height: SPACING.xl }}></View>
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
    paddingHorizontal: 16,
  },
});
