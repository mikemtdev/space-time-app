import { useQuery, gql } from '@apollo/client';
import { Box, FlatList, Image, Text } from 'native-base';
import React from 'react';

const LAUNCHED_QUERY = gql`
  query {
    launchesPast(limit: 20) {
      id
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
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
    return <Text>Checking prelaunch systems</Text>;
  }
  if (error) {
    return <Text>Error! {error.message}</Text>;
  }
  const { launchesPast } = data;
  console.log(
    'PastLaunch:This is for ==> data:',
    launchesPast
  );
  return (
    <FlatList
      data={launchesPast}
      renderItem={({
        item: {
          rocket: { rocket_name },
          launch_site: { site_name_long },
          mission_name,
          mission_patch,
        },
      }) => (
        <Box
          shadow={0}
          borderWidth={0}
          px={4}
          py={2}
          my={2}
          mx={3}>
          <Image
            w={100}
            h={100}
            source={{ uri: mission_patch }}
            alt={rocket_name}
          />
          <Text fontSize='md' bold mb={1}>
            {rocket_name}
          </Text>
          <Text>{site_name_long}</Text>
          <Text>{mission_name}</Text>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export const Launched = () => {
  return (
    <Box bgColor='white'>
      <LaunchedComponent />
    </Box>
  );
};
