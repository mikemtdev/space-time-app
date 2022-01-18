import { useQuery, gql } from '@apollo/client';
import { Box, FlatList, Image, Text } from 'native-base';
import React from 'react';
import { LaunchedCard } from '../../components/cards/Launched';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';

const LAUNCHED_QUERY = gql`
  query {
    launchesPast(limit: 20) {
      id
      mission_id
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
        mission_patch
        mission_patch_small
      }
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;

const LaunchedComponent = () => {
  const { loading, error, data } = useQuery(LAUNCHED_QUERY);

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
  // console.log(
  //   'PastLaunch:This is for ==> data:',
  //   launchesPast
  // );
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
          links: { mission_patch, mission_patch_small },
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
