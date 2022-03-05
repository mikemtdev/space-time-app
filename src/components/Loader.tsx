import { Center, Spinner, Text } from 'native-base';
import React from 'react';
import { LayoutContainer } from './LayoutContainer';

export const Loader = () => {
 return (
  <LayoutContainer>
   <Center flex={1}>
    <Text mb={2} color="indigo" bold italic>
     Checking pre-launch systems
    </Text>
    <Spinner accessibilityLabel="Loading posts" />
   </Center>
  </LayoutContainer>
 );
};
