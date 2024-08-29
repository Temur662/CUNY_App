import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform , View, ImageBackground, SafeAreaView, Pressable, Text, Dimensions} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  const { width, height } = Dimensions.get('screen')
  return (
    <ImageBackground
      source={require("@/assets/images/blurbg.png")}
      style={{ flex :1 }}
      imageStyle={{ flex :1 }}
    >
      <SafeAreaView style={{ alignItems : 'center', flex : 1}}>
          <View className='flex-col w-[100%]'>
            <View>
              <Text className='text-4xl font-bold text-center'>Welcome to</Text>
              <Text className='text-4xl font-bold text-center'>Campus Resources</Text>
            </View>
            <View>
              <Text className='text-2xl text-gray-400 font-bold text-center'>We are here to support you</Text>
            </View>
          </View>
          <Link href={'/(user)/explore/TutorsScreen'} asChild>
          <Pressable>
            <ImageBackground 
              source={{ uri : 'https://www.teachermagazine.com/assets/images/teacher/Implementing-tutoring-interventions-in-schools.jpg' }}
              style={{ height : height / 5, width : width * .9 , borderRadius : 10, marginTop  : 5, justifyContent : 'flex-end', alignItems : 'center' }}
              imageStyle={{ borderRadius : 10 }}
            >
                <View className=' border bg-blue-400 w-[50%] mb-4 p-2 rounded-xl'>
                  <Text className='text-center text-white font-bold'>Start Tutoring</Text>
                </View>
            </ImageBackground>
            </Pressable>
          </Link>


          <Link href={'/(user)/explore/AcademicAndCounsler'} asChild>
            <Pressable>
              <ImageBackground 
                source={{ uri : 'https://www.topeducationdegrees.org/wp-content/uploads/2020/06/What-is-an-Academic-Advisor-1024x683.jpg' }}
                style={{ height : height / 5, width : width * .9 , borderRadius : 10, marginTop  : 20, justifyContent : 'flex-end', alignItems : 'center' }}
                imageStyle={{ borderRadius : 10 }}
              >
                  <View className=' border bg-green-400 w-[50%] mb-4 p-2 rounded-xl'>
                    <Text className='text-center text-white font-bold'>Meet Your Advisors</Text>
                  </View>
              </ImageBackground>
            </Pressable>
          </Link>

          <Link href={'/(user)/explore/Scholarships'} asChild>
            <Pressable>
              <ImageBackground 
                source={{ uri : 'https://images.collegedunia.com/public/college_data/images/studyabroad/appImage/college_2075_03-12:37_CollegeofStatenIsland.jpeg' }}
                style={{ height : height / 5, width : width * .9 , borderRadius : 10, marginTop  : 20, justifyContent : 'flex-end', alignItems : 'center' }}
                imageStyle={{ borderRadius : 10 }}    
              >
                <View className=' border bg-purple-400 w-[50%] mb-4 p-2 rounded-xl'>
                    <Text className='text-center text-white font-bold'>Scholarship's</Text>
                  </View>
            </ImageBackground>
          </Pressable>
         </Link>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
