import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../Components/Header';
import {
  COLORS,
  FONTSIZES,
  FONTWEIGHTS,
  SPACING,
} from '../Constants/Constants';
import Button from '../Components/Button';
import Spacer from '../Components/Spacer';
import { useTypedNavigation } from '../Hooks/useTypedNavigation';

const StarterScreen = () => {
  const navigation = useTypedNavigation();
  const insets = useSafeAreaInsets(); // top & bottom safe area

  return (
    <SafeAreaView
      style={[styles.safe, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Header title="Autism Quiz" />

        <Spacer />

        {/* MAIN CONTENT */}
        <Text numberOfLines={2} style={styles.Heading}>
          Welcome to the Autism Quiz
        </Text>

        <Spacer />

        <Text style={styles.subHeading}>
          This quiz is designed to understand if you might have any traits
          associated to autism. It's not a diagnostic tool but it can be helpful
          straight point.
        </Text>

        <Spacer />

        <View style={styles.btnContainer}>
          <Button
            ButtonText="Login"
            TextColor="white"
            ButtonBg={COLORS.primary}
            style={{ width: '90%' }}
            OnPress={() => navigation.navigate('Login')}
          />

          <Button
            ButtonText="Sign Up"
            ButtonBg={COLORS.secondary}
            style={{ width: '90%' }}
            OnPress={() => navigation.navigate('SignUp')}
          />

          <Button
            ButtonText="Continue as Guest"
            style={{ width: '90%' }}
          />
        </View>

        <Spacer />

        <Text style={styles.bottomText}>
          By continuing this, you agree to our Terms of Service and Privacy Policy.
        </Text>

        <Spacer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StarterScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 12,
    paddingBottom: 20,
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
    alignItems: 'center',
    rowGap: SPACING.lg,
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 16,
  },
});
