import { View, Text, Image, Pressable, Dimensions, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import Animated, { useAnimatedStyle, withTiming, useSharedValue, withRepeat } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper'
import AnimatedTabBar from '@/components/AnimatedTabBar'

const SignIn = () => {
  const { width } = Dimensions.get('screen') 
  const offset = useSharedValue(width)
  const [ selectedTab, setSelectedTab ] = useState(0)
  const selectedChoice = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))

  const onPressRegister = () => {
    offset.value = withTiming(offset.value, {duration : 1000})
  }
  useEffect(() => {
  }, [])
  return (
    <ImageBackground
        source={require('@/assets/images/blurbg.png')}
        style={{ flex : 1 }}
        imageStyle={{ flex : 1, objectFit : 'fill'}}
    >
        <SafeAreaView className='flex-1'>
        <Stack.Screen options={{ headerShown : false }}/>
            <BlurView intensity={10} className='flex-1 flex-col bg-gray'>
                <Image source={require('@/assets/images/CUNYname-logo.png')} style={{width : '90%', height : '25%', objectFit : 'contain', alignSelf : 'center'}}/>
                <View className='w-[90%] self-center pt-[25%]'>
                    <Text className='text-4xl font-bold text-center pt-3'>Discover all of CUNY's gems here</Text>
                </View>
                <View className='w-[90%] self-center'>
                    <Text className='text-lg font-bold text-center pt-3 text-gray-400'>Explore all of CUNY resources from study help, Advisor assistant, Job/Internship searching</Text>
                </View>
                <View className='flex-1 justify-end px-5 rounded-lg'>
                <AnimatedTabBar animatedTabs={[{'title' : 'Register'}, {'title' : 'Sign In'}]} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                </View>
            </BlurView>  
        </SafeAreaView>
    </ImageBackground>
  )
}

export default SignIn