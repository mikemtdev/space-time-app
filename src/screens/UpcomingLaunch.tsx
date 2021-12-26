import { useQuery, gql } from '@apollo/client';
import { Box, FlatList, Image, Text } from 'native-base';
import React from 'react';

const UPCOMING_LAUNCHES = gql`
  query {
    launchesUpcoming(limit: 10) {
      id
      mission_name
      mission_id
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
        rocket_type
      }
      links {
        mission_patch
      }
    }
  }
`;

const UpcomingLaunches = () => {
  const { loading, error, data } = useQuery(
    UPCOMING_LAUNCHES
  );
  if (loading) {
    return <Text>Checking prelaunch systems</Text>;
  }
  if (error) {
    return <Text>Error! {error.message}</Text>;
  }
  const { launchesUpcoming } = data;
  console.log('App:This is for ==> data:', data);
  // return data.launchesUpcoming.map((launch, index) => (
  //   <Box key={index} shadow={8} py={3} mx={3}>
  //     <Text fontSize='md' bold mb={1}>
  //       {launch.rocket.rocket_name}
  //     </Text>
  //     <Text>{launch.launch_site.site_name_long}</Text>
  //     <Text>{launch.mission_name}</Text>
  //   </Box>
  return (
    <FlatList
      data={launchesUpcoming}
      renderItem={({
        item: {
          rocket: { rocket_name },
          launch_site: { site_name_long },
          mission_name,
          mission_patch,
        },
      }) => (
        <Box shadow={8} py={3} mx={3}>
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
export const UpcomingLaunch = () => {
  return (
    <Box bgColor='white' flex='1'>
      <UpcomingLaunches />
    </Box>
  );
};
