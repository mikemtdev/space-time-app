import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import {
  Box,
  Flex,
  Link,
  ScrollView,
  Text,
} from 'native-base';
import React from 'react';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';
export const DragonsDetails = (props) => {
  const { id } = props.route.params;
  console.log('DragonDe:This is for ==> id:', id);
  const Query = gql`
    query {
        dragon(id: "${id}") {
    description
    active
    crew_capacity
    diameter {
      meters
      feet
    }
    id
    type
    wikipedia
    name
    thrusters {
      type
      amount
    }
  }
  }
  `;

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

  const {
    dragon: {
      description,
      active,
      crew_capacity,
      diameter,

      type,
      wikipedia,
      name,
      thrusters,
    },
  } = data;

  const { meters, feet } = diameter;
  // console.log(
  //   'missionDetails:This is for ==> payloads:',
  //   customers
  // );

  return (
    <LayoutContainer>
      <ScrollView>
        <Box mx='3'>
          <Text mb='2' fontSize='lg' bold>
            Name: {name}
          </Text>
          <Text fontSize='md' mb='1' bold>
            Active: {active.toString()}
          </Text>

          <Text mb='1' bold>
            Type: {type}
          </Text>
          <Text mb='1' bold>
            Crew Capacity: {crew_capacity}
          </Text>
          <Text mb='1' bold>
            {/* Stages: {stages} */}
          </Text>
          <Text mb='1' bold>
            Diameter (Meters/Feet): {meters}/{feet}
          </Text>

          <Text mb={5} bold>
            Learn more:
            <Link href={wikipedia}>wikipedia</Link>
          </Text>

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

            <Text>{description}</Text>
          </Box>
          {/*
          <Text mb='2'>
            Rocket Type: {data.launch.rocket.rocket_type}
          </Text>
          <Text mb='2'>
            Launch Year: {data.launch.launch_year}
          </Text>
          <Text mb='3'>{data.launch.details}</Text> */}
        </Box>
      </ScrollView>
    </LayoutContainer>
  );
};
