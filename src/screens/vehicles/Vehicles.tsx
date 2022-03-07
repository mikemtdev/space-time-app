import { gql, useQuery } from '@apollo/client';
import { Button, FlatList, Flex, Text } from 'native-base';
import React, { useState } from 'react';
import { DragonsCard } from '../../components/cards/vehicles/dragons';
import { RocketsCard } from '../../components/cards/vehicles/rockets';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';
import getVehicles from '../../services/get-Vehicles';

const RocketsAndCapsulesComponent = () => {
 const [view, setView] = useState('dragons');

 const { loading, error, data } = getVehicles.useGetCapsules();

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
   <Flex py={2} direction="row" justifyContent="space-around">
    <Text bold color="indigo.600" bgColor="indigo.500" px={23}>
     {view.toLocaleUpperCase()}
    </Text>
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
   {view === 'dragons' ? (
    <FlatList
     data={capsules}
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
