import { Center, Text } from 'native-base';
import React from 'react';

export const NetworkError = () => {
  return (
    <Center flex={1}>
      <Text mb={2} color='indigo' bold italic>
        Checking pre-launch systems Failed
      </Text>
      <Text mb={2} color='#125' bold italic>
        Error> Please check your internet connection
      </Text>
      
    </Center>
  );
};
