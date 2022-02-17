import { gql, useQuery } from '@apollo/client';
import { Box, Flex, HStack, Link, ScrollView, Text } from 'native-base';
import React, { FC } from 'react';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';

interface RocketsDetailsProps {
 route: route;
}
type route = {
 params: params;
};
type params = {
 id: string;
};
export const RocketsDetails: FC<RocketsDetailsProps> = (props) => {
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

 const {
  rocket: {
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
    <Box mx="3">
     <HStack>
      <Text mr={1} mb="2" fontSize="lg" bold>
       Name:
      </Text>
      <Text mb="2" fontSize="lg">
       {name}
      </Text>
     </HStack>
     <HStack>
      <Text mr={1} fontSize="md" mb="1" bold>
       By:
      </Text>
      <Text fontSize="md" mb="1">
       {company}
      </Text>
     </HStack>

     <HStack>
      <Text mr="1" bold>
       Success Rate Pct:
      </Text>

      <Text mb="1">{success_rate_pct}</Text>
     </HStack>
     <HStack mb="1">
      <Text mr="1" bold>
       Stages:
      </Text>
      <Text>{stages}</Text>
     </HStack>
     <HStack mb="1">
      <Text mr="1" bold>
       Meters/Feet:
      </Text>
      <Text>
       {meters}/{feet}
      </Text>
     </HStack>
     <HStack mb={5}>
      <Text mr={1} bold>
       Learn more:
      </Text>
      <Link href={wikipedia}>wikipedia</Link>
     </HStack>

     <Box borderWidth={2} px={3} borderColor="warmGray.200" py={2} mb={2}>
      <Box bgColor="warmGray.200" w="1/4" borderRadius="full" p={1}>
       <Flex align="center">
        <Text color="black" bold>
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
