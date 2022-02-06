import { useNavigation } from '@react-navigation/core';
import { Box, Pressable, Text } from 'native-base';
import React from 'react';

export const DragonsCard = ({
  item: {
    dragon,
    type,
    status,
    reuse_count,
    original_launch,
    landings,
    dragon: { name, id },
  },
}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('DragonsDetails', { id });
      }}>
      <Box
        shadow={0}
        borderWidth={0}
        px={4}
        py={2}
        my={2}
        mx={3}>
        {/* <Image
w={100}
h={100}
source={{ uri: mission_patch }}
alt={rocket_name}
/> */}
        <Text fontSize='lg' bold mb={1}>
          {name}
        </Text>
        <Text bold>Type: {type}</Text>
        <Text>Status: {status}</Text>
        <Text>Reuse count: {reuse_count}</Text>
        {/* <Text>
    Original Launch: {original_launch}
  </Text> */}
        <Text>Landings: {landings}</Text>
      </Box>
    </Pressable>
  );
};
