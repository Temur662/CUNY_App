import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform , View, ImageBackground, SafeAreaView, Pressable, Text} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/blurbg.png")}
      style={{ flex :1 }}
      imageStyle={{ flex :1 }}
    >
      <SafeAreaView style={{ alignItems : 'center', flex : 1}}>
          <Link href={'/(user)/explore/TutorsScreen'} asChild>
            <Pressable className=' border bg-white w-[90%]'>
              <Text>Tutors</Text>
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
