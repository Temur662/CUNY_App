import { View, Text, Image, Pressable, Dimensions, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { Link, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import Animated, { useAnimatedStyle, withTiming, useSharedValue, withRepeat } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient';

const SignIn = () => {
  const { width } = Dimensions.get('screen') 
  const offset = useSharedValue(width)

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
                    
                    <View className='flex-row w-[100%] bg-gray-400 justify-between rounded-2xl h-[13%]'>
                        <Link href={'/SignUp'} asChild>
                            <Pressable className='w-[50%] h-[100%] items-center justify-center'>
                                <Text className='text-xl font-bold'>Register</Text>
                            </Pressable>
                        </Link>
                        <Link href={'/LoginScreen'} asChild>
                            <Pressable className='w-[50%] h-[100%] items-center justify-center'>
                                <Text className='text-xl font-bold'>Sign In</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </BlurView>  
        </SafeAreaView>
    </ImageBackground>
  )
}

export default SignIn