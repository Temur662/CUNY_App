import { View, Text, Image } from 'react-native'
import React from 'react'
import { Upcomings } from '@/types'
import { Button } from 'react-native-paper'
type UpcomingCardProp = {
    upcomings : Upcomings
}
const UpcomingCard = ({upcomings} : UpcomingCardProp) => {
  return (
    <View className='w-[350] h-[200] bg-white flex-col rounded-2xl p-5'>
       <View className='flex-row h-[15%] justify-between'>
        <View className='w-[50%]'>
            <Text className='font-bold' numberOfLines={2}  allowFontScaling adjustsFontSizeToFit>{upcomings.subject}</Text>
        </View>
        <View className='w-[50%]'>
            <View className='flex-col'>
                { upcomings.time.length > 0 ? upcomings.time.map((item) => {
                    return(
                        <Text style={{ fontSize : 11 }} numberOfLines={2} allowFontScaling adjustsFontSizeToFit className='font-bold'>{item}</Text>
                    )
                }) : <></>}
        </View>
        </View>
      </View>
        <View className='w-[100%] flex-row justify-evenly flex-1 mt-5'>
            <Image
                source={{ uri : upcomings.pic }}
                style={{ width : 50, height : 50, borderRadius : 50}}
            />
            <View className='flex-col'>
                <Text>{upcomings.speaker}</Text>
                <Text className='font-bold' numberOfLines={2}  allowFontScaling adjustsFontSizeToFit>{upcomings.subject}</Text>
                </View>
        </View>
        <View className='w-[60%] self-center'>
            <Button mode='contained' buttonColor='green'>Join Meeting</Button>
        </View>
    </View>
  )
}

export default UpcomingCard