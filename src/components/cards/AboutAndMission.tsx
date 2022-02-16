import { useNavigation } from '@react-navigation/core';
import { Box, Button, Flex, Text } from 'native-base';
import React from 'react';

export const AboutAndMission = ({
  details,
  path,
  mission_id,
}: {
  details: string;
  path: string;
  mission_id: string;
}) => {
  console.log(
    'AboutAndMission:This is for ==> mission_id:',
    mission_id
  );
  const navigation = useNavigation();
  return (
    <Box>
      <Box
        borderWidth={2}
        px={3}
        borderColor='warmGray.200'
        py={2}
        mb={2}>
        <Box
          bgColor='warmGray.200'
          w='1/4'
          borderRadius='full'
          p={1}>
          <Flex align='center'>
            <Text color='black' bold>
              About
            </Text>
          </Flex>
        </Box>
        <Text mb='3'>
          {details !== null
            ? details
            : 'No info about launch'}
        </Text>
      </Box>
      {mission_id.length > 0 && (
        <Button
          bgColor='black'
          onPress={() =>
            navigation.navigate('missionDetails', {
              mission_id,
            })
          }>
          About mission
        </Button>
      )}
    </Box>
  );
};
