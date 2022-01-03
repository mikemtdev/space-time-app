import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LaunchDetails } from '../screens/launch/LaunchDetails';
import { missionDetails } from '../screens/vehicles/missionDetails';
import { UpcomingLaunch } from '../screens/launch/UpcomingLaunch';

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
        component={UpcomingLaunch}
      />
      <Stack.Screen
        name='LaunchDetails'
        component={LaunchDetails}
      />
      <Stack.Screen
        name='missionDetails'
        component={missionDetails}
      />
    </Stack.Navigator>
  );
};
