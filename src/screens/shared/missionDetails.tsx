import { ApolloError, gql, useQuery } from '@apollo/client';
import {
 Box,
 Center,
 FlatList,
 HStack,
 Link,
 ScrollView,
 Text,
} from 'native-base';
import React, { FC } from 'react';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';

interface renderProps {
 mission_id: string;
}
const Render: FC<renderProps> = ({ mission_id }) => {
 const getMission = gql`
  query Mission($mission_id: ID!) {
   mission(id: $mission_id) {
    description
    id
    manufacturers
    name
    website
    twitter
    wikipedia
    payloads {
     customers
     reused
     id
     norad_id
    }
   }
  }
 `;

 const { loading, error, data } = useQuery(getMission, {
  variables: {
   mission_id: mission_id,
  },
 });

 if (loading) {
  return <Loader />;
 }
 if (error) {
  if (error.networkError) {
   return <NetworkError />;
  }
  return <ErrorMessage error={error} />;
 }

 if (data.mission == null) {
  return (
   <>
    <Box mx="3">
     <HStack mb="2">
      <Center flex="1">
       <Text>No Data on mission</Text>
      </Center>
     </HStack>
    </Box>
   </>
  );
 }

 const { name, manufacturers, wikipedia, description } = data.mission;

 return (
  <ScrollView my={4}>
   <Box mx="3">
    {data && (
     <>
      <HStack mb="2">
       <Text fontSize="lg" mr={1} bold>
        Mission:{' '}
       </Text>
       <Text fontSize="lg">{name}</Text>
      </HStack>
      <HStack mb="2">
       <Text fontSize="md" mr={1} bold>
        By:
       </Text>
       <Text fontSize="md">{manufacturers}</Text>
      </HStack>

      <HStack>
       <Text mr={1} bold>
        wikipedia Link:
       </Text>
       <Link href={wikipedia}>wikipedia</Link>
      </HStack>

      <Box
       mt={2}
       borderWidth={2}
       px={3}
       borderColor="warmGray.200"
       py={2}
       mb={2}
      >
       <Text bold>About Mission :</Text>
       <Text>{description}</Text>
      </Box>
     </>
    )}
   </Box>
  </ScrollView>
 );
};

interface MissionDetailsProps {
 route: route;
}
type route = {
 params: params;
};
type params = {
 mission_id: string;
};

const MissionDetails: FC<MissionDetailsProps> = (props) => {
 const { mission_id } = props.route.params;
 const mission_idObject = mission_id[0];

 return (
  <LayoutContainer>
   <Render mission_id={mission_idObject} />
  </LayoutContainer>
 );
};

export default MissionDetails;
