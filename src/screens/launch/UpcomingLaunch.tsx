import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import {
  Center,
  FlatList,
  Image,
  Pressable,
  Text,
} from 'native-base';
import React, { FC } from 'react';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';

type CardProps = {
  id: string;
  mission_name: string;
  mission_id: string;
  launch_site: string;
  rocket: string;
  links: string;
};

const UpComingCard: FC<CardProps> = ({
  id,
  launch_site,
  links: { mission_patch },
  mission_id,
  mission_name,
  rocket: { rocket_name },
}) => {
  const navigation = useNavigation();

  console.log('====================================');
  console.log(id);
  console.log('====================================');
  return (
    <Pressable
      shadow={0}
      borderWidth={0}
      px={4}
      py={2}
      my={2}
      mx={3}
      onPress={() =>
        navigation.navigate('LaunchDetails', {
          id,
          mission_id,
        })
      }>
      <Center>
        <Image
          size='xl'
          resizeMode='contain'
          source={{ uri: mission_patch }}
          alt='mission_patch'
        />
      </Center>
      <Text fontSize='md' bold mb={1}>
        {rocket_name}
      </Text>
      <Text>{launch_site.site_name_long}</Text>
      <Text>{mission_name}</Text>
    </Pressable>
  );
};

const UpcomingLaunches = () => {
  const UPCOMING_LAUNCHES = gql`
    query {
      launchNext {
        id
        mission_name
        mission_id
        launch_site {
          site_name_long
        }
        rocket {
          rocket_name
          rocket_type
        }
        links {
          mission_patch
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(
    UPCOMING_LAUNCHES
  );
  if (loading) {
    return <Loader />;
  }
  if (error) {
    if (error.networkError) {
      return <NetworkError />;
    }
    return <ErrorMessage error={error} />;
  }
  const { launchNext } = data;
  console.log(
    'Upcoming:This is for ==> launchNext:',
    launchNext
  );
  const toArray = new Array(launchNext);
  return (
    <FlatList
      data={toArray}
      renderItem={({ item }) => <UpComingCard {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export const UpcomingLaunch = () => {
  const UPCOMING_LAUNCHES = gql`
    query {
      launchNext {
        id
        mission_name
        mission_id
        launch_site {
          site_name_long
        }
        rocket {
          rocket_name
          rocket_type
        }
        links {
          mission_patch
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(
    UPCOMING_LAUNCHES
  );
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
    'UpcomingL:This is for ==> data:',
    data.launchNext.launch_site.site_name_long
  );
  return (
    <LayoutContainer>
      <UpcomingLaunches />
    </LayoutContainer>
  );
};
