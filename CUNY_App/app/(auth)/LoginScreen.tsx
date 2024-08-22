import { View, Text, SafeAreaView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { Button, TextInput } from 'react-native-paper'
const LoginScreen = () => {
  const [ fullName, setFullName ] = useState('')
  const [ emplid, setEmplid ] = useState('')
  return (
    <ImageBackground
    source={require('@/assets/images/blurbg.png')}
    style={{ flex : 1 }}
    imageStyle={{ flex : 1, objectFit : 'fill'}}
    >
      <Stack.Screen options={{ headerBackTitleVisible : false, headerTransparent : true, headerTitle : '' }} />
      <SafeAreaView className='flex-1'>
        <View className='flex-col items-center flex-2'>
            <View className=''>
                <Text className='text-2xl font-bold '>Hello Again!</Text>
            </View>
            <View>
                <Text className='text-center text-xl'>Welcome back you've been missed!</Text>
            </View>
        </View>
        <View className='flex-col gap-y-4 flex-1'>
            <TextInput 
                placeholder='Full Name'
                value={fullName}
                onChangeText={setFullName}
                style={{ width : '90%', alignSelf : 'center' }}
                mode='outlined'
            />
            <TextInput 
                placeholder='Empl ID Number'
                value={emplid}
                onChangeText={setEmplid}
                style={{ width : '90%', alignSelf : 'center' }}
                mode='outlined'
            />
        </View>
        <View className='flex-1'>
            <Button mode='contained' buttonColor='#0000ff' style={{ height: 60, alignItems: 'center', justifyContent : 'center', width : '90%', alignSelf : 'center' }}>Sign In</Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default LoginScreen