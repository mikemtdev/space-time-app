import { useQuery, gql } from '@apollo/client';
import React from 'react';
import { LayoutContainer } from '../components/LayoutContainer';
import { ErrorMessage } from '../components/Errors/ErrorMessage';
import { NetworkError } from '../components/Errors/NetworkError';
import { Loader } from '../components/Loader';
import {
  Box,
  Button,
  Link,
  ScrollView,
  Text,
} from 'native-base';
import { useNavigation } from '@react-navigation/core';
export const missionDetails = (props) => {
  const { id, mission_id } = props.route.params;

  const Query = gql`
    query {
      mission(id: ${mission_id}) {
        description
        name
        manufacturers
        wikipedia
        payloads {
          customers
          manufacturer
          nationality
          orbit
          reused
          payload_mass_kg
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
    mission: {
      name,
      manufacturers,
      description,
      wikipedia,
      payloads,
    },
  } = data;
  const objectPayload = Object.assign({}, payloads);
  const {
    customers,
    manufacturer,
    nationality,
    orbit,
    reused,
    payload_mass_kg,
  } = objectPayload;
  console.log(
    'missionDetails:This is for ==> payloads:',
    customers
  );

  return (
    <LayoutContainer>
      <ScrollView>
        <Box mx='3'>
          <Text mb='2'>Mission Name: {name}</Text>
          <Text mb='2'>Manufacturers: {manufacturers}</Text>
          <Text bold>Mission Payload :</Text>
          <Text mb='2'>customers: {customers}</Text>
          <Text mb='2'>manufacturer: {manufacturer}</Text>
          <Text mb='2'>nationality: {nationality}</Text>
          <Text mb='2'>orbit: {orbit}</Text>
          <Text mb='2'>reused: {reused}</Text>
          <Text mb='2'>
            payload_mass_kg: {payload_mass_kg}
          </Text>

          <Text bold>
            wikipedia Link:
            <Link href={wikipedia}>wikipedia</Link>
          </Text>
          <Text bold>About Mission :</Text>
          <Text>{description}</Text>

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
