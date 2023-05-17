import { useNavigation } from '@react-navigation/core';
import { Box, Pressable, Text } from 'native-base';
import React, { FC } from 'react';

interface DragonsCardProps {
 item: Item;
}
type Item = {
 dragon: Dragon;
 type: string;
 status: string;
 reuse_count: string;
 landings: string;
};

type Dragon = {
 id: string;
 name: string;
};

export const CapsulesCard: FC<DragonsCardProps> = ({
 item: {
  type,
  status,
  reuse_count,
  landings,
  //   dragon: { name, id },
 },
}) => {
 const navigation = useNavigation();
 return (
  <Pressable
  //    onPress={() => {
  //     navigation.navigate('DragonsDetails', { id });
  //    }}
  >
   <Box shadow={0} borderWidth={0} px={4} py={2} my={2} mx={3}>
    {/* <Text fontSize="lg" bold mb={1}>
     {name}
    </Text> */}
    <Text bold>Type: {type}</Text>
    <Text>Status: {status}</Text>
    <Text>Reuse count: {reuse_count}</Text>

    {landings && <Text>Landings: {landings}</Text>}
   </Box>
  </Pressable>
 );
};
