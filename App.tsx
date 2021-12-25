import { StatusBar } from 'expo-status-bar';
import React from 'react';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from '@apollo/client';
import { URI } from './src/constants/api';
import { Box, Text, NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ApolloClient
const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});

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
    }
  }
`;

const UpcomingLaunches = () => {
  const { loading, error, data } = useQuery(
    UPCOMING_LAUNCHES
  );
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error! {error.message}</Text>;
  }
  console.log('App:This is for ==> data:', data);
  return data.launchesUpcoming.map((launch, index) => (
    <Box key={index} shadow={8} py={3} mx={3}>
      <Text fontSize='md' bold mb={1}>
        {launch.rocket.rocket_name}
      </Text>
      <Text>{launch.launch_site.site_name_long}</Text>
      <Text>{launch.mission_name}</Text>
    </Box>
  ));
};

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <UpcomingLaunches />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </ApolloProvider>
    </>
  );
}
