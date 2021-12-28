import { Center, Text } from 'native-base';
import React from 'react';

export const ErrorMessage = ({ error }: {}) => {
  return (
    <Center flex='1'>
      <Text>{error.message}</Text>
    </Center>
  );
};
