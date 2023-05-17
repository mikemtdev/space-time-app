import { gql, useQuery } from '@apollo/client';
import { Button, FlatList, Flex, Text } from 'native-base';
import React, { useState } from 'react';
import { DragonsCard } from '../../components/cards/vehicles/dragons';
import { RocketsCard } from '../../components/cards/vehicles/rockets';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';
import { CapsulesCard } from '../../components/cards/vehicles/capsules';

const RocketsAndCapsulesComponent = () => {
 const [view, setView] = useState('dragons');

 const CAPSULES = gql`
  query {
   capsules(find: {}) {
    id
    landings

    original_launch
    reuse_count
    status
    type
   }
   dragons {
    name
    id
    active
    crew_capacity
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
    }
   }
  }
 `;
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
 const { capsules, rockets, dragons } = data;

 return (
  <>
   <Flex py={2} direction="row" justifyContent="space-around">
    <Button
     bgColor={view === 'capsules' ? 'indigo.500' : 'indigo.400'}
     onPress={() => {
      view !== 'capsules' ? setView('capsules') : null;
     }}
    >
     Capsules
    </Button>
    <Button
     bgColor={view === 'dragons' ? 'indigo.500' : 'indigo.400'}
     onPress={() => {
      view !== 'dragons' ? setView('dragons') : null;
     }}
    >
     Dragons
    </Button>
    <Button
     bgColor={view === 'rockets' ? 'indigo.500' : 'indigo.400'}
     onPress={() => {
      view !== 'rockets' ? setView('rockets') : null;
     }}
    >
     Rockets
    </Button>
   </Flex>
   <Text bold color="indigo.600" bgColor="indigo.500" px={23}>
    {view.toLocaleUpperCase()}
   </Text>
   {view === 'capsules' ? (
    <FlatList
     data={capsules}
     renderItem={({ item }) => <CapsulesCard item={item} />}
     keyExtractor={(item) => item.id}
    />
   ) : view === 'dragons' ? (
    <FlatList
     data={dragons}
     renderItem={({ item }) => <DragonsCard item={item} />}
     keyExtractor={(item) => item.id}
    />
   ) : view === 'rockets' ? (
    <FlatList
     data={rockets}
     renderItem={({ item }) => <RocketsCard item={item} />}
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
