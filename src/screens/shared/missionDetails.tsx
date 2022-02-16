import { gql, useQuery } from '@apollo/client';
import {
  Box,
  FlatList,
  HStack,
  Link,
  ScrollView,
  Text,
} from 'native-base';
import React from 'react';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';

const Render = ({ mission_id }) => {
  const getMission = gql`
query {
    mission(id: "${mission_id}") {
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

  const { loading, error, data } = useQuery(getMission);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    if (error.networkError) {
      return <NetworkError />;
    }
    return <ErrorMessage error={error} />;
  }
  console.log(
    'LaunchedDetails:This is for ==> data:',
    data
  );

  const {
    name,
    manufacturers,
    wikipedia,
    description,
    payloads,
  } = data.mission;

  return (
    <ScrollView my={4}>
      <Box mx='3'>
        <HStack mb='2'>
          <Text fontSize='lg' mr={1} bold>
            Mission:{' '}
          </Text>
          <Text fontSize='lg'>{name}</Text>
        </HStack>
        <HStack mb='2'>
          <Text fontSize='md' mr={1} bold>
            By:
          </Text>
          <Text fontSize='md'>{manufacturers}</Text>
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
          borderColor='warmGray.200'
          py={2}
          mb={2}>
          <Text bold>About Mission :</Text>
          <Text>{description}</Text>
        </Box>
        <Box
          mt={2}
          borderWidth={2}
          px={3}
          borderColor='warmGray.200'
          py={2}
          mb={2}>
          <Text bold>Payload:</Text>

          <FlatList
            data={data.mission.payloads}
            renderItem={({ item }) => {
              {
                item?.customers[0] ? (
                  <Box>
                    <Text>{item?.customers[0]}</Text>
                    <Text>
                      {item?.reused ? 'true' : null}
                    </Text>
                  </Box>
                ) : null;
              }
            }}
            keyExtractor={(item) => item?.norad_id[0]}
          />
          <Text></Text>
        </Box>
      </Box>
    </ScrollView>
  );
};
const MissionDetails = (props) => {
  const { mission_id } = props.route.params;
  const mission_idObject = mission_id[0];

  return (
    <LayoutContainer>
      <Render mission_id={mission_idObject} />
    </LayoutContainer>
  );
};

export default MissionDetails;
