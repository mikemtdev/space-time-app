import { FlatList } from 'native-base';
import React from 'react';
import { UpComingCard } from '../../components/cards/upcommingLaunches';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';
import { default as LaunchService } from '../../services/get-launches';

const UpcomingLaunches = () => {
 const { data, error, loading } = LaunchService.useGetUpComingLaunches();
 if (loading) {
  return <Loader />;
 }
 if (error) {
  if (error.networkError) {
   return <NetworkError />;
  }
  return <ErrorMessage error={error} />;
 }
 const { launchNext } = data;
 const toArray = new Array(launchNext);
 return (
  <FlatList
   data={toArray}
   renderItem={({ item }) => <UpComingCard {...item} />}
   keyExtractor={(item) => item.id}
  />
 );
};

export const UpcomingLaunch = () => {
 return (
  <LayoutContainer>
   <UpcomingLaunches />
  </LayoutContainer>
 );
};
