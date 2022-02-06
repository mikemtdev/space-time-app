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
  Link,
  ScrollView,
  Text,
} from 'native-base';
import { useNavigation } from '@react-navigation/core';

export const RocketsDetails = (props) => {
  const { id } = props.route.params;
  console.log('RockDe:This is for ==> id:', id);
  const Query = gql`
  query{
    rocket(id: "${id}"){
      wikipedia
    type
    success_rate_pct
    stages
    name
    mass {
      kg
      lb
    }
    height {
      feet
      meters
    }
    first_flight
    engines {
      type
    }
    description
    diameter {
      feet
      meters
    }
    active
    cost_per_launch
    country
    company
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
    rocket: {
      type,
      success_rate_pct,
      stages,

      name,
      company,
      description,
      wikipedia,

      height,
    },
  } = data;

  const { meters, feet } = height;

  return (
    <LayoutContainer>
      <ScrollView>
        <Box mx='3'>
          <Text mb='2' fontSize='lg' bold>
            Name: {name}
          </Text>
          <Text fontSize='md' mb='1' bold>
            By: {company}
          </Text>

          <Text mb='1' bold>
            Type: {type}
          </Text>
          <Text mb='1' bold>
            Success Rate Pct: {success_rate_pct}
          </Text>
          <Text mb='1' bold>
            Stages: {stages}
          </Text>
          <Text mb='1' bold>
            Meters/Feet: {meters}/{feet}
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
        </Box>
      </ScrollView>
    </LayoutContainer>
  );
};
