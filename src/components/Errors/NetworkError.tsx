import { Center, Text } from 'native-base';
import React from 'react';
import { LayoutContainer } from '../LayoutContainer';

export const NetworkError = () => {
 return (
  <LayoutContainer>
   <Center flex={1}>
    <Text mb={2} color="indigo" bold italic>
     Checking pre-launch systems Failed
    </Text>
    <Text mb={2} color="#125" bold italic>
     Error{'>'} Please check your internet connection
    </Text>
   </Center>
  </LayoutContainer>
 );
};
