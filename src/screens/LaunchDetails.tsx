import { useQuery, gql } from '@apollo/client';
import React from 'react';
import { LayoutContainer } from '../components/LayoutContainer';
import { ErrorMessage } from '../components/Errors/ErrorMessage';
import { NetworkError } from '../components/Errors/NetworkError';
import { Loader } from '../components/Loader';
import { Box, Button, ScrollView, Text } from 'native-base';
import { useNavigation } from '@react-navigation/core';
export const LaunchDetails = (props) => {
  const { id, mission_id } = props.route.params;

  const Query = gql`query{
 launch(id: ${id}) {
    id
    mission_name
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

  const { data, loading, error } = useQuery(Query);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    if (error.networkError) {
      return <NetworkError />;
    }
    return <ErrorMessage error={error} />;
  }
  const navigation = useNavigation();
  console.log('LaunchDetails:This is for ==> id:', id);
  return (
    <LayoutContainer>
      <ScrollView>
        <Box mx='3'>
          <Text mb='2'>
            Mission Name: {data.launch.mission_name}
          </Text>
          <Text mb='2'>
            Rocket Name: {data.launch.rocket.rocket_name}
          </Text>
          <Text mb='2'>
            Rocket Type: {data.launch.rocket.rocket_type}
          </Text>
          <Text mb='2'>
            Launch Year: {data.launch.launch_year}
          </Text>
          <Text bold>About Launch:</Text>
          <Text mb='3'>{data.launch.details}</Text>
          <Button
            bgColor='black'
            onPress={() =>
              navigation.navigate('missionDetails', {
                mission_id,
              })
            }>
            About mission
          </Button>
        </Box>
      </ScrollView>
    </LayoutContainer>
  );
};
