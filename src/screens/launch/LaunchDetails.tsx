import { useQuery, gql } from '@apollo/client';
import React from 'react';
import { LayoutContainer } from '../../components/LayoutContainer';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { Loader } from '../../components/Loader';
import {
  Box,
  Button,
  Flex,
  HStack,
  ScrollView,
  Text,
} from 'native-base';
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
          <HStack>
            <Text bold>Rocket Name: </Text>
            <Text mb='2'>
              Mission Name: {data.launch.mission_name}
            </Text>
          </HStack>
          <HStack>
            <Text bold>Rocket Name: </Text>
            <Text mb='2'>
              {data.launch.rocket.rocket_name}
            </Text>
          </HStack>
          <HStack>
            <Text bold>Rocket Type: </Text>
            <Text mb='2'>
              {data.launch.rocket.rocket_type}
            </Text>
          </HStack>
          <HStack>
            <Text bold>Launch Year: </Text>
            <Text mb='2'>{data.launch.launch_year}</Text>
          </HStack>
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
            <Text mb='3'>{data.launch.details}</Text>
          </Box>
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
