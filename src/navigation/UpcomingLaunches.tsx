import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LaunchDetails } from '../screens/LaunchDetails';
import { missionDetails } from '../screens/missionDetails';
import { UpcomingLaunch } from '../screens/UpcomingLaunch';

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
