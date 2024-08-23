import { Image, StyleSheet, Platform, View, Text, ImageBackground } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Schedule from 'f-react-native-schedule';
import WeekView from 'react-native-week-view';
import { useProfile } from '@/providers/ProfileProvider';
import { Icon } from 'react-native-paper';
export default function HomeScreen() {
  const { profile } = useProfile()
  return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: 'rgba(0,0,0,0)', dark: 'rgba(0,0,0,0)' }}
        headerImage={
          <Image
            source={require('@/assets/images/csi.png')}
            style={styles.reactLogo}
          />
        }>
        <View className='flex-row flex-1'>
          <View>
            <Image source={{ uri : 'https://i.sstatic.net/l60Hf.png' }} height={80} width={80} style={{objectFit : 'cover', borderRadius : 50}}/>
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
          <Text className='text-xl font-bold'>Upcoming</Text>

        </View>
      </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
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
