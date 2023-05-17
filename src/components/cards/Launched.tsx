import React from 'react';
import { Box, Center, Image, Pressable, Text } from 'native-base';
import { useNavigation } from '@react-navigation/core';

export const LaunchedCard = ({
 id,
 mission_id,
 mission_patch,
 rocket_name,
 launch_date_utc,
 mission_name,
}: {
 id: string;
 mission_id: string;
 mission_patch: string;
 rocket_name: string;
 launch_date_utc: string;
 mission_name: string;
}) => {
 const navigation = useNavigation();

 const date = new Date(launch_date_utc).toUTCString();
 return (
  <Pressable
   borderWidth={0}
   onPress={() =>
    navigation.navigate('LaunchedDetails', {
     id,
     mission_id,
    })
   }
  >
   <Box shadow={0} borderWidth={0} px={4} py={2} my={2} mx={3}>
    <Center>
     <Image
      w={100}
      h={100}
      resizeMode="contain"
      source={{
       uri: 'https://e7.pngegg.com/pngimages/205/39/png-clipart-spacex-crs-3-international-space-station-spacex-crs-1-spacex-crs-2-spacex-dragon-nasa-miscellaneous-falcon.png',
      }}
      alt={rocket_name}
     />
    </Center>
    <Text fontSize="md" bold mb={1}>
     {rocket_name}
    </Text>
    {mission_name && (
     <Text fontSize="md" bold mb={1}>
      mission: {mission_name}
     </Text>
    )}
    <Text>{date}</Text>
    <Text>{mission_name}</Text>
   </Box>
  </Pressable>
 );
};
