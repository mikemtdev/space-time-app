import { Box, Flex, HStack, Link, ScrollView, Text } from 'native-base';
import React, { FC } from 'react';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';
import getVehicles from '../../services/get-Vehicles';
interface DragonsDetailsProps {
 route: route;
}
type route = {
 params: params;
};
type params = {
 id: string;
};

export const DragonsDetails: FC<DragonsDetailsProps> = (props) => {
 const { id } = props.route.params;

 const { data, loading, error } = getVehicles.useGetDragon({ id });
 if (loading) {
  return <Loader />;
 }
 if (error) {
  if (error.networkError) {
   return <NetworkError />;
  }
  return <ErrorMessage error={error} />;
 }

 const {
  dragon: {
   description,
   active,
   crew_capacity,
   diameter,

   type,
   wikipedia,
   name,
  },
 } = data;

 const { meters, feet } = diameter;

 return (
  <LayoutContainer>
   <ScrollView>
    <Box mx="3">
     <HStack mb="2">
      <Text mr="1" fontSize="lg" bold>
       Name:
      </Text>
      <Text fontSize="lg">{name}</Text>
     </HStack>
     <HStack mb="1">
      <Text fontSize="md" mr="1" bold>
       Active:
      </Text>
      <Text fontSize="md">{active.toString()}</Text>
     </HStack>

     <HStack mb="1">
      <Text mr="1" bold>
       Type:
      </Text>
      <Text>{type}</Text>
     </HStack>
     <HStack mb="1">
      <Text mr="1" bold>
       Crew Capacity:
      </Text>
      <Text>{crew_capacity}</Text>
     </HStack>
     <HStack mb="1">
      <Text mr="1" bold>
       Diameter (Meters/Feet):
      </Text>
      <Text>
       {meters}/{feet}
      </Text>
     </HStack>

     <HStack mb={5}>
      <Text mr={1} bold>
       Learn more:
      </Text>
      <Link href={wikipedia}>wikipedia</Link>
     </HStack>

     <Box borderWidth={2} px={3} borderColor="warmGray.200" py={2} mb={2}>
      <Box bgColor="warmGray.200" w="1/4" borderRadius="full" p={1}>
       <Flex align="center">
        <Text color="black" bold>
         About
        </Text>
       </Flex>
      </Box>

      <Text>{description}</Text>
     </Box>
    </Box>
   </ScrollView>
  </LayoutContainer>
 );
};
