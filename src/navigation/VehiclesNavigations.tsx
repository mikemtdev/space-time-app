import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { DragonsDetails } from '../screens/vehicles/DragonsDetails';
import { RocketsDetails } from '../screens/vehicles/RocketsDetails';
import { Vehicles } from '../screens/vehicles/Vehicles';

const Stack = createNativeStackNavigator();
const VehiclesNavigations = () => {
 return (
  <Stack.Navigator
   screenOptions={{
    headerShadowVisible: false,
   }}
  >
   <Stack.Screen name="Vehicles" component={Vehicles} />
   <Stack.Screen
    name="RocketsDetails"
    options={{
     headerTitle: 'About Rocket',
    }}
    component={RocketsDetails}
   />
   <Stack.Screen
    name="DragonsDetails"
    options={{
     headerTitle: 'About Dragon',
    }}
    component={DragonsDetails}
   />
  </Stack.Navigator>
 );
};

export default VehiclesNavigations;
