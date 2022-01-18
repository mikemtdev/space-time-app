import { useQuery, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Box,
  Center,
  FlatList,
  Image,
  Pressable,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { Loader } from '../../components/Loader';
import { LayoutContainer } from '../../components/LayoutContainer';
import { LaunchDetails } from './LaunchDetails';

const UPCOMING_LAUNCHES = gql`
  query {
    launchesUpcoming(limit: 10) {
      id
      mission_name
      mission_id
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
        rocket_type
      }
      links {
        mission_patch
      }
    }
  }
`;

const UpcomingLaunches = () => {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(
    UPCOMING_LAUNCHES
  );
  if (loading) {
    return <Loader />;
  }
  if (error) {
    if (error.networkError) {
      return <NetworkError />;
    }
    return <ErrorMessage error={error} />;
  }
  const { launchesUpcoming } = data;
  console.log('App:This is for ==> data:', data);
  // return data.launchesUpcoming.map((launch, index) => (
  //   <Box key={index} shadow={8} py={3} mx={3}>
  //     <Text fontSize='md' bold mb={1}>
  //       {launch.rocket.rocket_name}
  //     </Text>
  //     <Text>{launch.launch_site.site_name_long}</Text>
  //     <Text>{launch.mission_name}</Text>
  //   </Box>
  return (
    <FlatList
      data={launchesUpcoming}
      renderItem={({
        item: {
          id,
          rocket: { rocket_name },
          launch_site: { site_name_long },
          links: { mission_patch },
          mission_name,
          mission_id,
        },
      }) => (
        <Pressable
          shadow={0}
          borderWidth={0}
          px={4}
          py={2}
          my={2}
          mx={3}
          onPress={() =>
            navigation.navigate('LaunchDetails', {
              id,
              mission_id,
            })
          }>
          <Center>
            <Image
              size='xl'
              resizeMode='contain'
              source={{ uri: mission_patch }}
              alt='mission_patch'
            />
          </Center>
          <Text fontSize='md' bold mb={1}>
            {rocket_name}
          </Text>
          <Text>{site_name_long}</Text>
          <Text>{mission_name}</Text>
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export const UpcomingLaunch = () => {
  return (
    <LayoutContainer>
      <UpcomingLaunches />
    </LayoutContainer>
  );
};
