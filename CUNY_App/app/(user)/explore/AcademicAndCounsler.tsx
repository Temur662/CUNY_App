import SchoolResourcesCaoursel from '@/components/Carousel/SchoolResoucesCarousel';
import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const AcademicAdvisors = () => (
  <View style={{ flex: 1 }}>
    <SchoolResourcesCaoursel advisment='Academic'/>
  </View>
);

const Counslers = () => (
    <View style={{ flex: 1 }}>
    <SchoolResourcesCaoursel advisment='Counsler'/>
  </View>
);

const renderScene = SceneMap({
  first: AcademicAdvisors,
  second: Counslers,
});
const renderTabBar = (props : any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor : "blue", position: "absolute", zIndex : -1, bottom : "8%", left : "3.5%", height: "85%", width : "45%", borderRadius : 20  }}
      style={{ backgroundColor: '#e0e0e0', width : "95%", alignSelf : "center", borderRadius : 20}}
      labelStyle={{ color : "white", fontWeight : "bold" }}
    />
  );
export default function AcademicAndCounsler() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Academic' },
    { key: 'second', title: 'Counslers' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      style={{ backgroundColor : "#ededed"}}

    />
  );
}