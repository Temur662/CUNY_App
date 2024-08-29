import { Image, StyleSheet, Platform, View, Text, ImageBackground, FlatList, ScrollView, Dimensions } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useProfile } from '@/providers/ProfileProvider';
import { Icon } from 'react-native-paper';
import { useUpcoming } from '@/providers/UpcomingProvider';
import UpcomingCard from '@/components/UpcomingCard';
export default function HomeScreen() {
  const { profile } = useProfile()
  const { upcoming } = useUpcoming()
  const { width, height } = Dimensions.get('screen')
  return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: 'rgba(0,0,0,0)', dark: 'rgba(0,0,0,0)' }}
        headerImage={
          <Image
            source={require('@/assets/images/csi.png')}
            style={styles.reactLogo}
          />
        }>
        <View className='flex-row'>
          <View className='flex-1'>
            <Image source={require('@/assets/images/ab.png')} style={{objectFit : 'cover', borderRadius : 50, height : 80, width: 80}}/>
          </View>
          <View className='flex-col flex-1 self-center justify-center'>
            <View style={{ alignItems : 'flex-end'}}>
              <Icon source={'bell'} size={25} color='gray'/>
            </View>
            <View>
              <Text className='text-center font-bold text-lg'>{profile.firstName} {profile.lastName}</Text>
        </View>

          <View>
              <Text className='text-center font-bold text-gray-400'>Empil ID:{profile.emplid}</Text>
          </View>
          </View>
        </View>
        <View className='flex-col'>
          <Text className='text-xl font-bold'>Weekly Schedule</Text>
          <View>
            <Image 
              source={{ uri : profile.scheduleImg?.uri }}
              style={{ height : 200, width : '100%', objectFit : 'cover', borderRadius : 10 }}
            />
          </View>
        </View>

        <View style={{ width : width }} className=''>
            <Text className='text-xl font-bold'>Upcoming</Text>
            <FlatList 
              data={upcoming}
              renderItem={({item, index}) => <View className='px-3'><UpcomingCard upcomings={item} index={index}/></View>}
              contentContainerStyle={{ paddingVertical : 2, flexGrow : 1, paddingHorizontal : 8  }}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width :width }}
            />
        </View>
        
      </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
    alignSelf : 'center',
    marginLeft : '13%'
  },
});
