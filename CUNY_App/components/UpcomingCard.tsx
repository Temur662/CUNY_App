import { View, Text } from 'react-native'
import React from 'react'
import { Upcomings } from '@/types'
type UpcomingCardProp = {
    upcomings : Upcomings
}
const UpcomingCard = ({upcomings} : UpcomingCardProp) => {
  return (
    <View>
      <Text>UpcomingCard</Text>
    </View>
  )
}

export default UpcomingCard