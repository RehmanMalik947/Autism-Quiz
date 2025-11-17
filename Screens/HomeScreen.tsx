import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../Components/Header'
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation=useNavigation()
  return (
    <SafeAreaView>
      <Header title='Autism Quiz' leftIcon={<ArrowLeft/>} onPressLeft={()=>navigation.goBack()} />
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})