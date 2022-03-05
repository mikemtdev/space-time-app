import { ApolloError } from '@apollo/client';
import { Center, Text } from 'native-base';
import React, { FC } from 'react';
import { LayoutContainer } from '../LayoutContainer';
interface ErrorMessageProps {
 error: ApolloError;
}
export const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
 return (
  <LayoutContainer>
   <Center flex="1">
    <Text>{error.message}</Text>
   </Center>
  </LayoutContainer>
 );
};
