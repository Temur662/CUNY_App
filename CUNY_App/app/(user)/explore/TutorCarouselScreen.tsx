import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import TutorCarousel from '@/components/Carousel/TutorCarousel'

const TutorCarouselScreen = () => {
  const tutorIndex = useLocalSearchParams()
  return (
    <View className='flex-1'>
      <TutorCarousel index={Number(tutorIndex.index)}/>
    </View>
  )
}

export default TutorCarouselScreen