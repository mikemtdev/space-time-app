import { Box } from 'native-base';
import React from 'react';

export const LayoutContainer = (props) => {
  return (
    <Box flex={1} bgColor='white'>
      {props.children}
    </Box>
  );
};
