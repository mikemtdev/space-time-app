import { useQuery, gql } from '@apollo/client';
import { Box, HStack, Text } from 'native-base';
import React from 'react';
import { LayoutContainer } from '../../components/LayoutContainer';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
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
    ships {
      active
      attempted_landings
      image
    }
    mission_id
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
      rocket: { rocket_name, rocket_type },
    },
  } = data;
  return (
    <LayoutContainer>
      <Box mx={3}>
        <HStack>
          {/* <Text fontSize='lg'>Mission:</Text> */}
          <Text fontSize='lg' bold>
            {mission_name}
          </Text>
        </HStack>
        <HStack>
          <Text bold>Rocket_name: </Text>
          <Text>{rocket_name}</Text>
        </HStack>
        <HStack>
          <Text bold>Year: </Text>
          <Text>{launch_year}</Text>
        </HStack>
      </Box>
    </LayoutContainer>
  );
};
