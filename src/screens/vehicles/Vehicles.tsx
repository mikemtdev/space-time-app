import { useQuery, gql } from '@apollo/client';
import {
  Box,
  Button,
  FlatList,
  Flex,
  Image,
  Spinner,
  Text,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';
import { NetworkError } from '../../components/Errors/NetworkError';
const CAPSULES = gql`
  query {
    capsules(find: {}) {
      id
      type
      status
      reuse_count
      original_launch
      missions {
        flight
        name
      }
      landings
      dragon {
        name
      }
    }

    rockets {
      id
      name
      type
      active
      description
      cost_per_launch
      height {
        meters
      }
      engines {
        type
        version
      }
    }
  }
`;
const RocketsAndCapsulesComponent = () => {
  const { loading, error, data } = useQuery(CAPSULES);
  const [view, setView] = useState('dragons');
  if (loading) {
    return <Loader />;
  }
  if (error) {
    if (error.networkError) {
      return <NetworkError />;
    }
    return <ErrorMessage error={error} />;
  }
  const { capsules, rockets } = data;

  return (
    <>
      <Flex
        py={2}
        direction='row'
        justifyContent='space-around'>
        <Text
          bold
          color='indigo.600'
          bgColor='indigo.500'
          px={23}>
          {view.toLocaleUpperCase()}
        </Text>
        <Button
          bgColor={
            view === 'dragons' ? 'indigo.500' : 'indigo.400'
          }
          onPress={() => {
            view !== 'dragons' ? setView('dragons') : null;
          }}>
          Dragons
        </Button>
        <Button
          bgColor={
            view === 'rockets' ? 'indigo.500' : 'indigo.400'
          }
          onPress={() => {
            view !== 'rockets' ? setView('rockets') : null;
          }}>
          Rockets
        </Button>
      </Flex>
      {view === 'dragons' ? (
        <FlatList
          data={capsules}
          renderItem={({
            item: {
              id,
              type,
              status,
              reuse_count,
              original_launch,
              landings,
              dragon: { name },
            },
          }) => (
            <Box
              shadow={0}
              borderWidth={0}
              px={4}
              py={2}
              my={2}
              mx={3}>
              {/* <Image
            w={100}
            h={100}
            source={{ uri: mission_patch }}
            alt={rocket_name}
          /> */}
              <Text fontSize='lg' bold mb={1}>
                {name}
              </Text>
              <Text bold>Type: {type}</Text>
              <Text>Status: {status}</Text>
              <Text>Reuse count: {reuse_count}</Text>
              {/* <Text>
                Original Launch: {original_launch}
              </Text> */}
              <Text>Landings: {landings}</Text>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : view === 'rockets' ? (
        <FlatList
          data={rockets}
          renderItem={({
            item: {
              id,
              name,
              type,
              active,
              description,
              cost_per_launch,
              height: { meters },
              engines: { type: engineType, version },
            },
          }) => (
            <Box
              shadow={0}
              borderWidth={0}
              px={4}
              py={2}
              my={2}
              mx={3}>
              {/* <Image
            w={100}
            h={100}
            source={{ uri: mission_patch }}
            alt={rocket_name}
          /> */}
              <Text fontSize='lg' bold mb={1}>
                {name}
              </Text>
              <Text bold>Type: {type}</Text>

              <Text>
                Status: {active ? 'active' : 'not active'}
              </Text>
              <Text>Cost: ${cost_per_launch}</Text>
              <Text>Engine: {engineType}</Text>
              {/* <Text>{landings}</Text> */}
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : null}
    </>
  );
};

export const Vehicles = () => {
  return (
    <LayoutContainer>
      <RocketsAndCapsulesComponent />{' '}
    </LayoutContainer>
  );
};
