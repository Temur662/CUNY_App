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
  Linking,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { Scholarships } from '@/assets/data/Scholarships';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { Upcomings } from '@/types';
import { useUpcoming } from '@/providers/UpcomingProvider'
import { useProfile } from '@/providers/ProfileProvider';
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
    <View style={{ height: '100%', width, position: 'absolute' }} >
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
              source={{ }}
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

export default function ScholarshipsCarousel({scholarshipType}  : {scholarshipType : string}) {
  const { onSetUpComings } = useUpcoming()
  const [ scholarships, setScholarships ] = React.useState<any[]>([])
  const { profile } = useProfile()
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const setDate = () => {
    const personalScholarships = []
    if( scholarshipType == 'Personal' ){
        const personal = Scholarships.map((item) => { 
            if( item.eligibility?.race.includes(profile.ethnicty)){
                personalScholarships.push(item)
            }
        }
        )
        personalScholarships.splice(0, 0, {})
        personalScholarships.push({})
        setScholarships(personalScholarships)
    }
  }
  React.useEffect(() => {
    setDate()
  }, [])
  return (
    <View style={styles.container}>
      <GeminiLoading loadingType='' />
      <Backdrop  scrollX={scrollX} tutorIndex={0}/> 
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={scholarships.length > 0 ? scholarships : Scholarships}
        
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
          const onPress = () => {
            Linking.canOpenURL(item.link).then(() => Linking.openURL(item.link))
          }
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
                  height : height / 1.6
                }}
              >
                <Image
                  source={{ uri : item.pic }}
                  style={styles.posterImage}
                />
                <View className='flex-row justify-evenly w-[100%] flex-wrap gap-1'>
                    <Text>{item.department}</Text>
                </View>
                <Text style={{ fontSize: 24 }} numberOfLines={1} adjustsFontSizeToFit className='font-bold'>
                  {item.name}
                </Text>
                <View className='flex-col flex-1 items-start justify-start'>
                  <Text style={{ fontSize: 12 }} numberOfLines={3} className='pt-3'>
                    Eligibilty:
                  </Text>
                  {item.eligibility.race ? <Text style={{ fontSize : 13 }} className='font-semibold pl-2'>Ethnicity: {item.eligibility.race}</Text> : <></>}
                  {item.eligibility.field_of_study ? <Text style={{ fontSize : 13 }} className='font-semibold pl-2'>Field of Study: {item.eligibility.field_of_study}</Text> : <></>}    
                  {item.eligibility.income ? <Text style={{ fontSize : 13 }} className='font-semibold pl-2'>Income: {item.eligibility.income}</Text> : <></>}   
                  { item.eligibility.age ? <Text style={{ fontSize : 13 }} className='font-semibold pl-2'>Income: {item.eligibility.age}</Text> : <></>} 
                  {item.eligibility.status ? <Text style={{ fontSize : 13 }} className='font-semibold pl-2'>Status: {item.eligibility.Status}</Text> : <></>}    
                  {item.eligibility.other ? <Text style={{ fontSize : 13 }} className='font-semibold pl-2'>Other: {item.eligibility.other}</Text> : <></>}    
                </View>
                <View className='flex-2 flex-row justify-end items-end'>
                  <Text className='text-sm text-center' allowFontScaling adjustsFontSizeToFit>{item.description}</Text>
                </View>
                <View className='flex-2 flex-row justify-end items-end'>
                  <Text className='font-bold'>Award: {item.award_amount}</Text>
                </View>
                <View className='mt-2'> 
                  <Button mode='contained' buttonColor='green'><Text numberOfLines={1} allowFontScaling adjustsFontSizeToFit className='text-sm' style={{ fontSize : 11}} onPress={onPress}>Deadline: {item.deadline}</Text></Button>
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