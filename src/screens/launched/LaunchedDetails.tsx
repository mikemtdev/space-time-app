import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
} from 'native-base';
import React from 'react';
import { AboutAndMission } from '../../components/cards/AboutAndMission';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';

export const LaunchedDetails = (props) => {
  const { id, mission_id } = props.route.params;
  // console.log('LaunchedDetails:This is for ==> id:', id);
  const fetchPastLaunches = gql`
  query {
    launch(id: ${id}) {
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
    launch_year
  }
      }`;
  const { loading, error, data } = useQuery(
    fetchPastLaunches
  );
  console.log(
    'LaunchedDetails:This is for ==> data:',
    data
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
  const {
    launch: {
      mission_name,
      details,
      launch_year,
      links: { mission_patch },

      rocket: { rocket_name, rocket_type },
    },
  } = data;

  return (
    <LayoutContainer>
      <ScrollView>
        <Box mx={3}>
          <Center>
            <Image
              w={100}
              h={100}
              source={{ uri: mission_patch }}
              alt={mission_name}
            />
          </Center>
          <HStack mt={4} mb={2}>
            <Text fontSize='lg' bold>
              Mission: {mission_name}
            </Text>
          </HStack>
          <HStack mb={1}>
            <Text fontSize='md' bold>
              Rocket:{' '}
            </Text>
            <Text fontSize='md'>{rocket_name}</Text>
          </HStack>
          <HStack mb={2}>
            <Text bold>Year: </Text>
            <Text>{launch_year}</Text>
          </HStack>

          <AboutAndMission
            path='pastedMissionDetails'
            mission_id={mission_id}
            details={details}
          />
        </Box>
      </ScrollView>
    </LayoutContainer>
  );
};
