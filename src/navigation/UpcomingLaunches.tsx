import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LaunchDetails } from '../screens/launch/LaunchDetails';
import { UpcomingLaunch } from '../screens/launch/UpcomingLaunch';
import MissionDetails from '../screens/shared/missionDetails';
import { missionDetails } from '../screens/vehicles/missionDetails';

const Stack = createNativeStackNavigator();
export const UpcomingLaunchesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
      initialRouteName='UpcomingLaunch'>
      <Stack.Screen
        name='UpcomingLaunch'
        options={{
          headerTitle: 'Upcoming Launches',
        }}
        component={UpcomingLaunch}
      />
      <Stack.Screen
        name='LaunchDetails'
        options={{
          headerTitle: 'About Launch',
        }}
        component={LaunchDetails}
      />
      <Stack.Screen
        name='missionDetails'
        options={{
          headerTitle: 'Mission Details',
        }}
        component={MissionDetails}
      />
    </Stack.Navigator>
  );
};
