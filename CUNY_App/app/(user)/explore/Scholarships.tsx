import ScholarshipsCarousel from '@/components/Carousel/ScholarshipsCarousel';
import SchoolResourcesCaoursel from '@/components/Carousel/SchoolResoucesCarousel';
import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const ScholarshipsForMe = () => (
  <View style={{ flex: 1 }}>
    <ScholarshipsCarousel  scholarshipType='Personal'/>
  </View>
);

const AllScholarships = () => (
    <View style={{ flex: 1 }}>
        <ScholarshipsCarousel  scholarshipType=''/>
    </View>
);

const renderScene = SceneMap({
  first: ScholarshipsForMe,
  second: AllScholarships,
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
    { key: 'first', title: 'For me' },
    { key: 'second', title: 'All Scholarships' },
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