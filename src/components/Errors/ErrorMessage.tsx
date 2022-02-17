import { ApolloError } from '@apollo/client';
import { Center, Text } from 'native-base';
import React, { FC } from 'react';
interface ErrorMessageProps {
 error: ApolloError;
}
export const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
 return (
  <Center flex="1">
   <Text>{error.message}</Text>
  </Center>
 );
};
