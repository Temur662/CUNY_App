import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Upcomings } from '@/types'
import { Button } from 'react-native-paper'
type UpcomingCardProp = {
    upcomings : Upcomings
    index : number
}
const UpcomingCard = ({upcomings, index} : UpcomingCardProp) => {
    const Tutoring =  'rgba(26, 167, 237,0.3)'
    const Academic_Advisment = 'rgba(169, 80, 199,0.3)'
    const Counseling = 'rgba(109, 222, 139,0.3)'
    
  return (
    <View style={[{backgroundColor : upcomings.upcomingType == 'Tutoring' ? 'rgba(26, 167, 237,0.3)' : upcomings.upcomingType == 'Academic Advisment' ? 'rgba(169, 80, 199,0.3)' : 'rgba(109, 222, 139,0.3)' , borderRadius : 10 }]} >
        <View className='w-[270] h-[220] flex-col rounded-2xl p-2'>
        <View className='flex-row h-[15%] justify-between '>
            <View className='w-[40%] h-[100%] justify-center' >
                <Text className=' italic text-white' numberOfLines={2}  allowFontScaling adjustsFontSizeToFit>{upcomings.upcomingType}</Text>
            </View>
            <View className='w-[60%] h-[100%] justify-center flex-col'>
                <View className='flex-col w-[100%] h-[100%]'>
                    { index === 0 ? 
                        <View className='flex-col self-end mr-4'> 
                            <Text className='font-bold text-center'>Now</Text>
                            <Text className='text-center text-gray-300 '>Today</Text>
                        </View> :
                    upcomings.time.length > 0 ? upcomings.time.map((item) => {
                        return(
                            <Text style={{ fontSize : 9 }} allowFontScaling adjustsFontSizeToFit className='font-bold'>{item}</Text>
                        )
                    }) : <></>}
            </View>
            </View>
        </View>
            <View className='w-[100%] flex-row justify-start mt-5  items-start'>
                <View className='items-center w-[100%] flex-row  justify-evenly'>
                <View className='flex-col w-[40%]'>
                    {index == 0 && <View style={{ width : 10, height : 10, backgroundColor : 'green', borderRadius : 50, alignSelf : 'flex-start'}}></View>}
                    <Image
                        source={{ uri : upcomings.pic }}
                        style={{ width : 50, height : 50, borderRadius : 50, marginLeft : 25 }}
                    />
                </View>
                <View className='flex-col w-[60%] items-center'>
                    <Text className='font-bold'>{upcomings.speaker}</Text>
                    <Text className='text-white text-center font-semibold' numberOfLines={2}  allowFontScaling adjustsFontSizeToFit>{upcomings.subject}</Text>
                    </View>
                </View>
            </View>
            <View className='w-[60%] self-center justify-end h-[45%]'>
            { index == 0 ?   <Button mode='contained' buttonColor='green'>Join Meeting</Button> : 
                <Button mode='contained' buttonColor='green' disabled>Awaiting</Button>
            }            
            </View>
        </View>
    </View>
  )
}

export default UpcomingCard