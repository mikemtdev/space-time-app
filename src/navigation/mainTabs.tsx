import {
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Launched } from '../screens/PastLaunch';
import { RocketsAndCapsules } from '../screens/RocketsAndCapsules';
import { UpcomingLaunch } from '../screens/UpcomingLaunch';

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
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen
        name='UpcomingLaunch'
        component={UpcomingLaunch}
        options={{
          tabBarLabel: 'Upcoming Launch',
          headerTitle: 'Launch Upcoming',
          tabBarIcon: ({}) => (
            <TabIcon name='rocket-launch-outline' />
          ),
        }}
      />
      <Tab.Screen
        name='Launched'
        component={Launched}
        options={{
          tabBarIcon: ({}) => <TabIcon name='orbit' />,
        }}
      />
      <Tab.Screen
        name='RocketsAndCapsules'
        component={RocketsAndCapsules}
        options={{
          tabBarLabel: 'Rockets & Capsules',
          headerTitle: 'Rockets & Capsules',
          tabBarIcon: ({}) => (
            <TabIcon name='space-station' />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
