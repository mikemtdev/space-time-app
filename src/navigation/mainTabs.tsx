import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { LaunchedNavigation } from './LaunchedNavigation';
import { UpcomingLaunchesStack } from './UpcomingLaunches';
import VehiclesNavigations from './VehiclesNavigations';

const Tab = createBottomTabNavigator();
interface TabIconProps {
 name: string;
 color?: string;
 size?: number;
}
// Icons
const TabIcon: FC<TabIconProps> = ({ name, color }) => {
 return <MaterialCommunityIcons name={name} color={color} size={24} />;
};

export const MainTabs = () => {
 return (
  <Tab.Navigator
   screenOptions={{
    headerShadowVisible: false,
   }}
  >
   <Tab.Screen
    name="UpcomingLaunchesStack"
    component={UpcomingLaunchesStack}
    options={{
     headerShown: false,
     tabBarLabel: 'Upcoming Launch',
     headerTitle: 'Launch Upcoming',
     tabBarIcon: () => <TabIcon color="black" name="rocket-launch-outline" />,
    }}
   />
   <Tab.Screen
    name="Launched"
    component={LaunchedNavigation}
    options={{
     headerShown: false,
     tabBarIcon: () => <TabIcon color="black" name="orbit" />,
    }}
   />
   <Tab.Screen
    name="VehiclesTab"
    component={VehiclesNavigations}
    options={{
     tabBarLabel: 'Vehicles',

     headerShown: false,
     tabBarIcon: () => <TabIcon color="black" name="space-station" />,
    }}
   />
  </Tab.Navigator>
 );
};
