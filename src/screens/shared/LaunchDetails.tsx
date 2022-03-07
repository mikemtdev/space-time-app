import { useNavigation } from '@react-navigation/core';
import { Box, Center, HStack, Image, ScrollView, Text } from 'native-base';
import React, { FC } from 'react';
import { AboutAndMission } from '../../components/cards/AboutAndMission';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';
import getLaunches from '../../services/get-launches';

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

 const { data, loading, error } = getLaunches.useGetUpComingLaunchesDetails({
  id,
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
 return (
  <LayoutContainer>
   <ScrollView>
    <Box my={5} mx="3">
     <Center>
      <Image
       size="xl"
       resizeMode="contain"
       source={{
        uri: data.launch.links.mission_patch,
       }}
       alt={`${data.launch.links.mission_name}`}
      />
     </Center>
     <HStack mt={4}>
      <Text fontSize="lg" bold>
       Mission Name:{' '}
      </Text>
      <Text fontSize="lg" mb="2">
       {data.launch.mission_name}
      </Text>
     </HStack>
     <HStack>
      <Text fontSize="md" bold>
       Rocket Name:{' '}
      </Text>
      <Text fontSize="md" mb="2">
       {data.launch.rocket.rocket_name}
      </Text>
     </HStack>
     <HStack>
      <Text bold>Rocket Type: </Text>
      <Text mb="2">{data.launch.rocket.rocket_type}</Text>
     </HStack>
     <HStack>
      <Text bold>Launch Year: </Text>
      <Text mb="2">{data.launch.launch_year}</Text>
     </HStack>

     <AboutAndMission
      path="missionDetails"
      mission_id={mission_id}
      details={data.launch.details}
     />
    </Box>
   </ScrollView>
  </LayoutContainer>
 );
};
