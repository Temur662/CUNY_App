import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ExploreStack = () => {
  return (
    <Stack>
        <Stack.Screen name='Explore' options={{ headerShown : false }}/>
        <Stack.Screen name='TutorsScreen' />
        <Stack.Screen name='TutorCarouselScreen' />
        <Stack.Screen name='AcademicAndCounsler' />
    </Stack>
  )
}

export default ExploreStack