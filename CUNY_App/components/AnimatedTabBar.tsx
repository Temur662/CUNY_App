import { View, Text, Pressable, LayoutChangeEvent } from 'react-native'
import React, { useState } from 'react'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useRouter } from 'expo-router'
export type AnimatedTabBarProp = {
    title : string
}

type AnimatedTabProp = {
    animatedTabs : AnimatedTabBarProp[],
    selectedTab : number,
    setSelectedTab : (index : number) => void
}
const AnimatedTabBar = ({ animatedTabs, selectedTab, setSelectedTab } : AnimatedTabProp) => {
  const [ dimensions, setDimensions ] = useState( {height : 20, width: 100} )
  const buttonWidth = dimensions.width / animatedTabs.length
  const tabPositonX = useSharedValue(0)
  const router = useRouter()
  const onTabBarLayout = (e : LayoutChangeEvent) => {
    setDimensions({
        height: e.nativeEvent.layout.height,
        width: e.nativeEvent.layout.width
    })
  }

  const handlePress = ( index : number ) => {
    setSelectedTab(index)
  }
  const onTabPress = ( index : number) => {
    tabPositonX.value = withTiming(buttonWidth * index, {}, () => runOnJS(handlePress)(index)
    )
  }

  const animatedStyle = useAnimatedStyle(() => {
    return{
        transform: [{ translateX: tabPositonX.value }]
    }
  })
  const goToScreen = (index : number) => {
    if( index == 0 ){
        setTimeout(() => router.push('/(auth)/SignUp'), 500)
        
    }else if ( index == 1){
        setTimeout(() => router.push('/(auth)/LoginScreen'), 500)
    }
  }
  return (
    <View className='bg-gray-400 justify-center' style={{ borderRadius: 20}}>
     <Animated.View className='bg-white' style={[ animatedStyle, { height: dimensions.height - 10, width: buttonWidth - 10, position : 'absolute', marginHorizontal: 5, borderRadius: 20 }]}/>
        <View onLayout={onTabBarLayout} className='flex-row'>
            {animatedTabs.map((tab, index) => {
                const color = selectedTab === index ? "black" : "white"
            return (
                    <Pressable key={index} style={{ flex : 1, paddingVertical : 20 }} onPress={() => {onTabPress(index); goToScreen(index)}}>
                        <Text style={{ color: color, alignSelf : "center", fontWeight: "bold", fontSize: 14 }}>{tab.title}</Text>
                    </Pressable>
                )
            })}
        </View>
    </View>
  )
}

export default AnimatedTabBar