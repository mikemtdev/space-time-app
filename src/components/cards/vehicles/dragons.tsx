import { useNavigation } from '@react-navigation/core';
import { Box, Pressable, Text } from 'native-base';
import React, { FC } from 'react';

interface DragonsCardProps {
 item: Item;
}
type Item = {
 id: string;
 name: string;
 active: boolean;
 crew_capacity: number;
 description: string;
};

export const DragonsCard: FC<DragonsCardProps> = ({
 item: { name, active, crew_capacity, description, id },
}) => {
 const navigation = useNavigation();
 return (
  <Pressable
   onPress={() => {
    navigation.navigate('DragonsDetails', { id });
   }}
  >
   <Box shadow={0} borderWidth={0} px={4} py={2} my={2} mx={3}>
    <Text fontSize="lg" bold mb={1}>
     {name}
    </Text>

    <Text>Crew Capacity: {crew_capacity}</Text>

    <Text>Status: {active && 'Active'}</Text>
   </Box>
  </Pressable>
 );
};
