import { gql, useQuery } from '@apollo/client';
import { Box, Center, HStack, Image, ScrollView, Text } from 'native-base';
import React, { FC } from 'react';
import { AboutAndMission } from '../../components/cards/AboutAndMission';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';

interface LaunchedDetailsProps {
 route: route;
}
type route = {
 params: params;
};
type params = {
 id: string;
 mission_id: string;
};

export const LaunchedDetails: FC<LaunchedDetailsProps> = (props) => {
 const { id, mission_id } = props.route.params;
 const fetchPastLaunches = gql`
  query PastLaunch($id: ID!) {
   launch(id: $id) {
    id
    mission_name
    details
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
    launch_date_utc
   }
  }
 `;
 const { loading, error, data } = useQuery(fetchPastLaunches, {
  variables: { id: id },
 });
 if (loading) {
  return <Loader />;
 }
 if (error) {
  if (error.networkError) {
   return <NetworkError />;
  }
  return <ErrorMessage error={error} />;
 }
 const {
  launch: {
   mission_name,
   details,
   launch_date_utc,
   links: { mission_patch },

   rocket: { rocket_name },
  },
 } = data;
 const year = new Date(launch_date_utc).getFullYear();

 return (
  <LayoutContainer>
   <ScrollView>
    <Box mx={3}>
     <Center>
      <Image
       w={100}
       h={100}
       source={{
        uri: 'https://e7.pngegg.com/pngimages/205/39/png-clipart-spacex-crs-3-international-space-station-spacex-crs-1-spacex-crs-2-spacex-dragon-nasa-miscellaneous-falcon.png',
       }}
       alt={mission_name}
      />
     </Center>
     <HStack mt={4} mb={2}>
      <Text fontSize="lg" bold>
       Mission: {mission_name}
      </Text>
     </HStack>
     <HStack mb={1}>
      <Text fontSize="md" bold>
       Rocket:{' '}
      </Text>
      <Text fontSize="md">{rocket_name}</Text>
     </HStack>
     <HStack mb={2}>
      <Text bold>Year: </Text>
      <Text>{year}</Text>
     </HStack>

     <AboutAndMission
      path="pastedMissionDetails"
      mission_id={mission_id}
      details={details}
     />
    </Box>
   </ScrollView>
  </LayoutContainer>
 );
};
