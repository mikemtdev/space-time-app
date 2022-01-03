import { useQuery, gql } from '@apollo/client';
import {
  Box,
  FlatList,
  Image,
  Spinner,
  Text,
} from 'native-base';
import React from 'react';
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
    }
    rockets {
      id
      type
      active
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
  // console.log(
  //   'RocketsAndCapsules:This is for ==> data:',
  //   data
  // );
  return (
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
          <Text fontSize='md' bold mb={1}>
            {type}
          </Text>
          <Text>{status}</Text>
          <Text>{reuse_count}</Text>
          <Text>{original_launch}</Text>
          <Text>{landings}</Text>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export const RocketsAndCapsules = () => {
  return (
    <LayoutContainer>
      <RocketsAndCapsulesComponent />{' '}
    </LayoutContainer>
  );
};
