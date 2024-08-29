import { View, Text, SafeAreaView, Pressable, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const TutorsScreen = () => {
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Biology']
  const { width, height }= Dimensions.get('screen')
  const subjectImages = ['https://www.freeimageslive.co.uk/files/images003/math.jpg', 'https://as2.ftcdn.net/v2/jpg/03/30/28/71/1000_F_330287153_5cSfp71gxln3S6Okn6ofKmEfK1khhlzd.jpg', 'https://img.freepik.com/free-vector/science-scribbles_23-2147501583.jpg?t=st=1724355442~exp=1724359042~hmac=90fca8afd9bd78d6b00c4909f10410647b51f5d7eddcb16b8d646a26eb9d5b01&w=1800', 'https://img.freepik.com/free-vector/neon-circuit-board-background_23-2148340911.jpg?t=st=1724355608~exp=1724359208~hmac=55cd3b87e78524d7550bc5ebb5da6522b95b4e79b7ec99105ffad93c847085b0&w=2000', 'https://plus.unsplash.com/premium_photo-1683121859548-b4514fa05e52?q=80&w=3498&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']
  return (
    <View className='flex-1 bg-white'>
      <SafeAreaView className='flex-1'>
        <View>
            <Text className='font-bold text-md text-center'>Choose a subject you would like tutoring in</Text>
        </View>
        <View className='items-center mt-3'>
            {subjects.map((item, index) => {
                return(
                    <Link href={{pathname : "/(user)/explore/TutorCarouselScreen", params : {index : index }}} asChild >
                      <Pressable>
                        <ImageBackground 
                          source={{ uri : subjectImages[index] }}
                          style={{ height : height / 7, width : width * .9 , borderRadius : 10, marginTop  : 5, justifyContent : 'flex-end', alignItems : 'center' }}
                          imageStyle={{ borderRadius : 10 }}
                        >
                            <View className=' border bg-blue-400 w-[50%] mb-4 p-2 rounded-xl'>
                              <Text className='text-center text-white font-bold'>{item}</Text>
                            </View>
                        </ImageBackground>
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