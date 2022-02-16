import {
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { LaunchedNavigation } from './LaunchedNavigation';
import { UpcomingLaunchesStack } from './UpcomingLaunches';
import VehiclesNavigations from './VehiclesNavigations';

const Tab = createBottomTabNavigator();

// Icons
const TabIcon = (Props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
  size: number;
}) => {
  return <MaterialCommunityIcons {...Props} size={24} />;
};

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}>
      <Tab.Screen
        name='UpcomingLaunchesStack'
        component={UpcomingLaunchesStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Upcoming Launch',
          headerTitle: 'Launch Upcoming',
          tabBarIcon: ({}) => (
            <TabIcon name='rocket-launch-outline' />
          ),
        }}
      />
      <Tab.Screen
        name='Launched'
        component={LaunchedNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({}) => <TabIcon name='orbit' />,
        }}
      />
      <Tab.Screen
        name='VehiclesTab'
        component={VehiclesNavigations}
        options={{
          tabBarLabel: 'Vehicles',

          headerShown: false,
          tabBarIcon: ({}) => (
            <TabIcon name='space-station' />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
