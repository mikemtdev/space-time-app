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
import { NavigationContainer } from '@react-navigation/native';
import { MainTabs } from './src/navigation/mainTabs';

// ApolloClient
const client = new ApolloClient({
 uri: URI,
 cache: new InMemoryCache(),
});

export default function App() {
 return (
  <>
   <ApolloProvider client={client}>
    <NativeBaseProvider>
     <NavigationContainer>
      <SafeAreaProvider>
       <MainTabs />
       {/* <UpcomingLaunches /> */}
      </SafeAreaProvider>
     </NavigationContainer>
    </NativeBaseProvider>
   </ApolloProvider>
  </>
 );
}
