import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { URI } from './src/constants/api';

// ApolloClient
const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Text>Apollo Working!</Text>
        <StatusBar style='auto' />
      </ApolloProvider>
    </>
  );
}
