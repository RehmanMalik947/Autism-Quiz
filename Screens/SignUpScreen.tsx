import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../Components/Header'
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native';
import Spacer from '../Components/Spacer'
import InputBox from '../Components/InputBox'
import Button from '../Components/Button'
import { COLORS } from '../Constants/Constants'
import apiService from '../Services/apiService';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState<String>('');
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [confirmPassword, setConfirmPassword] = useState<String>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async () => {
    try {
      setLoading(true);

      const res = await apiService.post('auth/register', { name, email, password });
      console.log('Signup response:', res);

      if (res?.data?.token) {
        Alert.alert('Success', 'Registered Successfully!');
        navigation.navigate('Login');
      }
    } catch (err: any) {
      Alert.alert('Signup Failed', err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ height: 12 }} />
      <Header title='Sign Up' leftIcon={<ArrowLeft />} onPressLeft={() => navigation.goBack()} />
      <Spacer />
      <View style={styles.inputContainer}>
        <InputBox placeholder='Full Name'
          value={name}
          onChangeText={setName}
        />
        <Spacer />
        <InputBox placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Spacer />
        <InputBox placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Spacer />
        <InputBox placeholder='Confirm Password' />
        <Spacer />
      </View>
      <View style={styles.TermsContainer}>
        <View><Text>I agree to The Terms and Conditions</Text></View>
        <View></View>
      </View>
      <Spacer />
      <Button ButtonText='Sign Up' ButtonBg={COLORS.primary} TextColor='white' OnPress={handleSignup} disabled={loading} style={{ width: '90%', marginInline: 'auto' }} />
      <View style={{
        position: 'absolute',      // fix at bottom
        bottom: 20,                // 20px from bottom
        left: 0,
        right: 0,
        flexDirection: 'row',      // horizontal layout
        justifyContent: 'center',  // center horizontally
        alignItems: 'center'
      }}>
        <Text style={{ fontSize: 16 }}>Already have an account? </Text>
        <Button
          ButtonText="SignIn"
          OnPress={() => navigation.navigate('Login')}
          style={{ marginLeft: 8 }}
        />
      </View>


      <Spacer />
    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
  },
  TermsContainer: {
    paddingHorizontal: 28
  }
})