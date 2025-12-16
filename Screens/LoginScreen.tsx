// src/Screens/LoginScreen.tsx
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/Header';
import InputBox from '../Components/InputBox';
import Button from '../Components/Button';
import { COLORS } from '../Constants/Constants';
import Spacer from '../Components/Spacer';
import { useTypedNavigation } from '../Hooks/useTypedNavigation';
import apiService from '../Services/apiService';

const LoginScreen: React.FC = () => {
  const navigation = useTypedNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);

      console.log('Hit login with:', { email, password });

      const res = await apiService.login({ email, password });
      

      console.log('Login Response:', res);

      if (res?.data?.token) {
        Alert.alert('Success', 'Login Successfully!');
        navigation.navigate('App'); // route name jo tumne stack me diya ho
      }
    } catch (err: any) {
      console.log('Login Error:', err?.response?.data || err?.message);

      const msg =
        err?.response?.data?.message || err?.message || 'Something went wrong';
      setError(msg);
      Alert.alert('Login Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Autism Quiz" />

      <View style={styles.container}>
        <Spacer />

        <View style={styles.btnContainer}>
          <InputBox
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <InputBox
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Spacer />

        <View style={styles.forgetPass}>
          <Text>Forgot Password?</Text>
        </View>

        <Spacer />

        <Button
          ButtonText={'Login'}
          ButtonBg={COLORS.primary}
          TextColor="white"
          style={{ marginHorizontal: 'auto', width: '90%' }}
          OnPress={handleLogin}
          disabled={loading}
        />

        <Spacer />
        <Text style={{ textAlign: 'center' }}>Or login with</Text>
        <Spacer />

        <View style={styles.loginButtons}>
          <Button
            ButtonText="Google"
            ButtonBg={COLORS.secondary}
            style={{ flex: 1 }}
          />
          <View style={{ width: 16 }} />
          <Button
            ButtonText="Facebook"
            ButtonBg={COLORS.secondary}
            style={{ flex: 1 }}
          />
        </View>

        {/* Debug dekhna ho to yeh add kar sakta hai */}
        {/* <Text style={{ marginTop: 20, textAlign: 'center' }}>
          DEBUG: {email} / {password}
        </Text> */}
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
  loginButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
