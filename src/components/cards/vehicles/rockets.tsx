import { useNavigation } from '@react-navigation/core';
import { Box, Text } from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';

export const RocketsCard = ({
  item: {
    id,
    name,
    type,
    active,
    description,
    cost_per_launch,
    height: { meters },
    engines: { type: engineType, version },
  },
}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('RocketsDetails', {
          id,
        });
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

        <Text>
          Status: {active ? 'active' : 'not active'}
        </Text>
        <Text>Cost: ${cost_per_launch}</Text>
        <Text>Engine: {engineType}</Text>
        {/* <Text>{landings}</Text> */}
      </Box>
    </Pressable>
  );
};
