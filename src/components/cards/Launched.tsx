import React from 'react';
import { Box, Center, Image, Pressable, Text } from 'native-base';
import { useNavigation } from '@react-navigation/core';

export const LaunchedCard = ({
 id,
 mission_id,
 mission_patch,
 rocket_name,
 site_name_long,
 mission_name,
}: {
 id: string;
 mission_id: string;
 mission_patch: string;
 rocket_name: string;
 site_name_long: string;
 mission_name: string;
}) => {
 const navigation = useNavigation();
 // console.log(
 //   'launched:This is for ==> mission_id:',
 //   mission_id
 // );
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
      source={{ uri: mission_patch }}
      alt={rocket_name}
     />
    </Center>
    <Text fontSize="md" bold mb={1}>
     {rocket_name}
    </Text>
    <Text>{site_name_long}</Text>
    <Text>{mission_name}</Text>
   </Box>
  </Pressable>
 );
};
