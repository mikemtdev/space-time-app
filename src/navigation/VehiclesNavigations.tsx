import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Vehicles } from '../screens/vehicles/Vehicles';

const Stack = createNativeStackNavigator();
const VehiclesNavigations = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}>
      <Stack.Screen name='Vehicles' component={Vehicles} />
    </Stack.Navigator>
  );
};

export default VehiclesNavigations;
