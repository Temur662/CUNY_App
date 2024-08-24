import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { Academic } from '@/assets/data/SchoolResources';
import { Counslers } from '@/assets/data/SchoolResources';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { Upcomings } from '@/types';
import { useUpcoming } from '@/providers/UpcomingProvider'
import GeminiLoading from './geminiLoading';
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.5;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const Backdrop = ({ tutors, scrollX, tutorIndex } : any) => {
  return (
    <View style={{ height: '100%', width, position: 'absolute' }}>
      <FlatList
        data={[1,2,3]}
        keyExtractor={(item) => item + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: '100%'}}
        renderItem={({ item, index }) => {
          if (!item) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
            removeClippedSubviews={false}
            style={{
              position: 'absolute',
              width: translateX,
              height,
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: '' }}
              style={{
                width,
                height: '100%',
                position: 'absolute',
              }}
            />
          </Animated.View>
        );
      }}
    />
    <LinearGradient
      colors={['rgba(0, 0, 0, 0)', 'white']}
      style={{
        height: BACKDROP_HEIGHT,
        width,
        position: 'absolute',
        bottom: 0,
      }}
    />
  </View>
);
};

export default function SchoolResourcesCaoursel({advisment}  : {advisment : string}) {
  const { onSetUpComings } = useUpcoming()
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const onSelect = (advisor : number) => {
    if( advisment == 'Academic') {
        const newUpcoming : Upcomings = {
            upcomingType : 'Academic Advisment',
            pic : Academic[advisor].pic,
            time : [Academic[advisor].availability!],
            speaker : Academic[advisor].name!,
            subject : Academic[advisor].department!
          }
          onSetUpComings(newUpcoming)
    }else{
        const newUpcoming : Upcomings = {
            upcomingType : 'Counseling',
            pic : Counslers[advisor].pic,
            time : [Counslers[advisor].availability!],
            speaker : Counslers[advisor].name!,
            subject : Counslers[advisor].department!
          }
          onSetUpComings(newUpcoming)
    }
   
  }
  return (
    <View style={styles.container}>
      <GeminiLoading loadingType='Academic'/>
      <Backdrop  scrollX={scrollX} tutorIndex={0}/> 
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={advisment == 'Academic' ? Academic : Counslers}
        
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.name )  {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [10, -30, 10],
            extrapolate: 'clamp',
          });
      
          return (
            <View style={{ width: ITEM_SIZE,  }} className=''>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  transform: [{ translateY }],
                  backgroundColor: 'white',
                  borderRadius: 34,
                  height : height / 1.7
                }}
              >
                <Image
                  source={{uri :item.pic }}
                  style={styles.posterImage}
                />
                <View className='flex-row justify-evenly w-[100%] flex-wrap gap-1'>
                    <Text>{item.department}</Text>
                </View>
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.name}
                </Text>
                <View className='flex-row flex-wrap flex-1 items-center'>
                  <Text style={{ fontSize: 12 }} numberOfLines={3} className='pt-3'>
                    Availability:
                  </Text>
                  <Text>{item.availability}</Text>
                </View>
                <View className='flex-2 flex-row justify-end items-end'>
                  <Text className='font-bold text-lg' numberOfLines={1} allowFontScaling adjustsFontSizeToFit>Location: {item.location}</Text>
                </View>
                <View className='flex-2 flex-row justify-end items-end'>
                  <Text>{item.contact}</Text>
                </View>
                <View className='mt-2'> 
                  <Button mode='contained' buttonColor='green' onPress={() => onSelect(index)}>Select</Button>
                </View>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
  }

  const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE / 1.5,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  });