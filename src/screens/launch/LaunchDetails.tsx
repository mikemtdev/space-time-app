import { useQuery, gql } from '@apollo/client';
import React, { FC } from 'react';
import { LayoutContainer } from '../../components/LayoutContainer';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { Loader } from '../../components/Loader';
import {
 Box,
 Button,
 Center,
 Flex,
 HStack,
 Image,
 ScrollView,
 Text,
} from 'native-base';
import { useNavigation } from '@react-navigation/core';

interface LaunchedCardProps {
 route: route;
}
type route = {
 params: params;
};
type params = {
 id: string;
 mission_id: string;
 mission_patch: string;
 rocket_name: string;
 site_name_long: string;
 mission_name: string;
};

export const LaunchDetails: FC<LaunchedCardProps> = (props) => {
 const { id, mission_id } = props.route.params;
 const navigation = useNavigation();

 const Query = gql`
  query LaunchDetails($id: ID!) {
   launch(id: $id) {
    id
    mission_name
    rocket {
     rocket_name
     rocket_type
    }
    links {
     mission_patch_small
     mission_patch
    }
    ships {
     active
     attempted_landings
     image
    }

    launch_date_utc
    launch_site {
     site_name_long
    }
    is_tentative
    details
   }
  }
 `;

 const {
  data: queryData,
  loading,
  error,
 } = useQuery(Query, {
  variables: {
   id: id,
  },
 });
 const data = queryData?.launch;
 const date = new Date(data?.launch_date_utc).toUTCString();
 if (loading) {
  return <Loader />;
 }

 if (error) {
  if (error.networkError) {
   return <NetworkError />;
  }
  return <ErrorMessage error={error} />;
 }
 return (
  <LayoutContainer>
   <ScrollView>
    <Box my={5} mx="3">
     <Center>
      <Image
       size="xl"
       resizeMode="contain"
       source={{
        uri: 'https://e7.pngegg.com/pngimages/205/39/png-clipart-spacex-crs-3-international-space-station-spacex-crs-1-spacex-crs-2-spacex-dragon-nasa-miscellaneous-falcon.png',
       }}
       alt={`${data.links.mission_name}`}
      />
     </Center>
     <HStack mt={4}>
      <Text fontSize="lg" bold>
       Mission Name:{' '}
      </Text>
      <Text fontSize="lg" mb="2">
       {data.mission_name}
      </Text>
     </HStack>
     <HStack>
      <Text fontSize="md" bold>
       Rocket Name:{' '}
      </Text>
      <Text fontSize="md" mb="2">
       {data.rocket.rocket_name}
      </Text>
     </HStack>
     <HStack>
      <Text bold>Rocket Type: </Text>
      <Text mb="2">{data.rocket.rocket_type}</Text>
     </HStack>
     <HStack>
      <Text bold> Date: </Text>
      <Text mb="2">{date}</Text>
     </HStack>
     <Box borderWidth={2} px={3} borderColor="warmGray.200" py={2} mb={2}>
      <Box bgColor="warmGray.200" w="1/4" borderRadius="full" p={1}>
       <Flex align="center">
        <Text color="black" bold>
         About
        </Text>
       </Flex>
      </Box>
      <Text mb="3">{data.details}</Text>
     </Box>
     <Button
      bgColor="black"
      onPress={() =>
       navigation.navigate('missionDetails', {
        mission_id,
       })
      }
     >
      About mission
     </Button>
    </Box>
   </ScrollView>
  </LayoutContainer>
 );
};
