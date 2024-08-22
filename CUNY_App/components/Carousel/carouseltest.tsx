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
import {Tutors} from '@/assets/data/Tutors'
import { LinearGradient } from 'expo-linear-gradient';
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const Backdrop = ({ tutors, scrollX } : any) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
      <FlatList
        data={Tutors.reverse()}
        keyExtractor={(item) => item + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
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
              source={{ uri: item.backdrop }}
              style={{
                width,
                height: BACKDROP_HEIGHT,
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

export default function Carousel() {
const scrollX = React.useRef(new Animated.Value(0)).current;

return (
  <View style={styles.container}>
   { /*<Backdrop tutors={Tutors[0]} scrollX={scrollX} /> */}
    <StatusBar hidden />
    <Animated.FlatList
      showsHorizontalScrollIndicator={false}
      data={Tutors[0].tutors}
      
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
        if (!item )  {
          return <View style={{ width: EMPTY_ITEM_SIZE }} />;
        }

        const inputRange = [
          (index - 2) * ITEM_SIZE,
          (index - 1) * ITEM_SIZE,
          index * ITEM_SIZE,
        ];

        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [100, 50, 100],
          extrapolate: 'clamp',
        });
     
        return (
          <View style={{ width: ITEM_SIZE, }}>
            <Animated.View
              style={{
                marginHorizontal: SPACING,
                padding: SPACING * 2,
                alignItems: 'center',
                transform: [{ translateY }],
                backgroundColor: 'white',
                borderRadius: 34,
                height : height / 2
              }}
            >
              <Image
                source={require('@/assets/images/profile.png')}
                style={styles.posterImage}
              />
              <Text style={{ fontSize: 24 }} className='text-center'>
                {item.classes_covered}
              </Text>
              <Text style={{ fontSize: 24 }} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 12 }} numberOfLines={3}>
                {item.availability}
              </Text>
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
  height: ITEM_SIZE / 2,
  resizeMode: 'cover',
  borderRadius: 24,
  margin: 0,
  marginBottom: 10,
},
});