import { Box } from 'native-base';
import React, { FC } from 'react';
interface LayoutContainerProps {
 children: React.ReactNode;
}
export const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
 return (
  <Box flex={1} bgColor="white">
   {children}
  </Box>
 );
};
