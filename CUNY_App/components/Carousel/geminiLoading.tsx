import { View, Text, Image } from 'react-native'
import React from 'react'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { ActivityIndicator } from 'react-native-paper';

const GeminiLoading = ({loadingType} : {loadingType : string}) => {
    const opacity = useSharedValue(1)
    const [ loading, setLoading ] = React.useState(true)
    const playMASAnimation = useAnimatedStyle(() => {
        return {
          opacity: opacity.value,
        };
      });
      const handleAnimationEnd = () => {
        setLoading(false);
      };
      const fadeOutAnimation = () => {
        opacity.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.quad) }, () => {
          runOnJS(handleAnimationEnd)();
        });
      }
    React.useEffect(() => {
        setTimeout(() => {
            fadeOutAnimation()
        }, 3000)
        }, [])
  return (
        <>
        {loading && (
            <Animated.View style={[{ zIndex: 1, position: 'absolute', width: '100%', height: '100%', flexDirection : 'column', }, playMASAnimation]}>
            <View className='bg-white flex-1'>
                <Image 
                    source={require('@/assets/images/geminiLogo.png')}
                    style={{ width : '90%', alignSelf : 'center', height : 300, objectFit : 'contain' }}
                />
                <View className='self-center flex-row items-center px-5'>
                    {loadingType == 'Tutor' ?  <View><Text className='font-bold text-2xl'>Matching Tutors...</Text></View> : loadingType == 'Academic' ? <View ><Text className='font-bold text-2xl text-center'>Matching Academic Advisors and counslers...</Text></View> : <View><Text className='font-bold text-2xl'>Matching Scholarships...</Text></View>}
                </View>
                <ActivityIndicator color='blue'/>
            </View>
            </Animated.View>
        )}
       </>
  )
}

export default GeminiLoading