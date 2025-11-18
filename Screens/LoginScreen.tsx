import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/Header';
import InputBox from '../Components/InputBox';
import Button from '../Components/Button';
import { COLORS } from '../Constants/Constants';
import Spacer from '../Components/Spacer';

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Autism Quiz" />
      <View style={styles.container}>
      <Spacer/>
        <View style={styles.btnContainer}>
          <InputBox placeholder="Email" />
          <InputBox placeholder="Password" />
        </View>
        <Spacer />
        <View style={styles.forgetPass}>
          <Text>Forgot Password?</Text>
        </View>
        <Spacer />
        <Button
          ButtonText="Login"
          ButtonBg={COLORS.primary}
          TextColor="white"
          style={{ marginInline: 'auto',width:'90%' }}
        />
        <Spacer />
        <Text style={{ textAlign: 'center' }}>Or login with</Text>
        <Spacer/>
        <View style={styles.loginButtons}>
          <Button ButtonText='Google' ButtonBg={COLORS.secondary} style={{flex:1}}/>
          <View style={{width:16}}/>
          <Button ButtonText='Facebook' ButtonBg={COLORS.secondary} style={{flex:1}}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  forgetPass: {
    paddingHorizontal: 24,
  },
  loginButtons:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:20
  }
});
