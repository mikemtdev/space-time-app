import { FlatList } from 'native-base';
import React from 'react';
import { LaunchedCard } from '../../components/cards/Launched';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';
import getLaunches from '../../services/get-launches';

const LaunchedComponent = () => {
 const { loading, error, data } = getLaunches.useGetPastLaunches();

 if (loading) {
  return <Loader />;
 }
 if (error) {
  if (error.networkError) {
   return <NetworkError />;
  }
  return <ErrorMessage error={error} />;
 }
 const { launchesPast } = data;

 return (
  <FlatList
   data={launchesPast}
   renderItem={({
    item: {
     id,
     mission_id,
     rocket: { rocket_name },
     launch_site: { site_name_long },
     mission_name,
     links: { mission_patch_small },
    },
   }) => (
    <LaunchedCard
     id={id}
     mission_id={mission_id}
     rocket_name={rocket_name}
     site_name_long={site_name_long}
     mission_name={mission_name}
     mission_patch={mission_patch_small}
    />
   )}
   keyExtractor={(item) => item.id}
  />
 );
};

export const Launched = () => {
 return (
  <LayoutContainer>
   <LaunchedComponent />
  </LayoutContainer>
 );
};
