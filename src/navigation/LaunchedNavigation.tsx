import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Launched } from '../screens/launched/PastLaunch';
import { LaunchDetails } from '../screens/shared/LaunchDetails';
import MissionDetails from '../screens/shared/missionDetails';

export const LaunchedNavigation = () => {
 const Stack = createNativeStackNavigator();
 return (
  <Stack.Navigator
   screenOptions={{
    headerShadowVisible: false,
   }}
  >
   <Stack.Screen
    name="PastLaunches"
    options={{
     headerTitle: 'Past Launches',
    }}
    component={Launched}
   />
   <Stack.Screen
    name="LaunchedDetails"
    options={{
     headerTitle: 'Launch Details',
    }}
    component={LaunchDetails}
   />
   <Stack.Screen
    name="launchedMissionDetails"
    options={{
     headerTitle: 'Mission Details',
    }}
    component={MissionDetails}
   />
  </Stack.Navigator>
 );
};
