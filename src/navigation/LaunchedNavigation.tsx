import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LaunchedDetails } from '../screens/launched/LaunchedDetails';
import { Launched } from '../screens/launched/PastLaunch';

export const LaunchedNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}>
      <Stack.Screen name='Launched' component={Launched} />
      <Stack.Screen
        name='LaunchedDetails'
        component={LaunchedDetails}
      />
    </Stack.Navigator>
  );
};