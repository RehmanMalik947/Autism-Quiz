import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../Components/Header'
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native';
import Spacer from '../Components/Spacer'
import InputBox from '../Components/InputBox'
import Button from '../Components/Button'
import { COLORS } from '../Constants/Constants'
const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <View style={{height:12}}/>
      <Header title='Sign Up' leftIcon={<ArrowLeft/>} onPressLeft={()=>navigation.goBack()}/>
<Spacer/>
<View style={styles.inputContainer}>
  <InputBox placeholder='Full Name'/>
  <Spacer/>
  <InputBox placeholder='Email'/>
  <Spacer/>
  <InputBox placeholder='Password'/>
  <Spacer/>
  <InputBox placeholder='Confirm Password'/>
  <Spacer/>
</View>
<View style={styles.TermsContainer}>
  <View><Text>I agree to The Terms and Conditions</Text></View>
  <View></View>
</View>
<Spacer/>
<Button ButtonText='Sign Up' ButtonBg={COLORS.primary} TextColor='white' style={{width:'90%',marginInline:'auto'}}/>
  <View style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
    <Text style={{fontSize:16}}>Already have an account?  SignIn </Text>
    </View> 
  <Spacer/>
    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  inputContainer:{
    alignItems:'center',
  },
  TermsContainer:{
    paddingHorizontal:28
  }
})