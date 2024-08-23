import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const TutorsScreen = () => {
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Biology']
  return (
    <View className='flex-1'>
      <SafeAreaView className='flex-1'>
        <Text>TutorsScreen</Text>
        <View>
            <Text>Choose a subject you would like tutoring in: </Text>
        </View>
        <View>
            {subjects.map((item, index) => {
                return(
                    <Link href={{pathname : "/(user)/explore/TutorCarouselScreen", params : {index : index }}} asChild >
                        <Pressable>
                            <Text>{item}</Text>
                        </Pressable>
                    </Link>
                )
            })}
        </View>
      </SafeAreaView>
    </View>
  )
}

export default TutorsScreen