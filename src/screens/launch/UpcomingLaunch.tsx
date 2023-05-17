import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import { Center, FlatList, Image, Pressable, Text } from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import { ErrorMessage } from '../../components/Errors/ErrorMessage';
import { NetworkError } from '../../components/Errors/NetworkError';
import { LayoutContainer } from '../../components/LayoutContainer';
import { Loader } from '../../components/Loader';

type CardProps = {
 id: string;
 mission_name: string;
 mission_id: string;
 launch_date_utc: string;
 launch_site: launchSite;
 rocket: rocket;
 links: links;
};

type launchSite = {
 site_name_long: string;
};
type links = {
 mission_patch: string;
};
type rocket = {
 rocket_name: string;
};

const UpComingCard: FC<CardProps> = ({
 id,
 launch_site,
 links: { mission_patch },
 mission_id,
 mission_name,
 launch_date_utc,
 rocket: { rocket_name },
}) => {
 const navigation = useNavigation();
 const date = new Date(launch_date_utc).toUTCString();
 const [image, setImage] = useState('');
 useEffect(() => {
  if (mission_patch != null) {
   setImage(mission_patch);
  } else {
   setImage(
    'https://e7.pngegg.com/pngimages/205/39/png-clipart-spacex-crs-3-international-space-station-spacex-crs-1-spacex-crs-2-spacex-dragon-nasa-miscellaneous-falcon.png'
   );
  }
 }, [mission_patch]);

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
   }
  >
   <Center>
    <Image
     size="xl"
     resizeMode="contain"
     source={{
      uri: 'https://e7.pngegg.com/pngimages/205/39/png-clipart-spacex-crs-3-international-space-station-spacex-crs-1-spacex-crs-2-spacex-dragon-nasa-miscellaneous-falcon.png',
     }}
     alt="mission_patch"
     onError={() => {
      setImage(
       'https://e7.pngegg.com/pngimages/205/39/png-clipart-spacex-crs-3-international-space-station-spacex-crs-1-spacex-crs-2-spacex-dragon-nasa-miscellaneous-falcon.png'
      );
     }}
    />
   </Center>
   <Text fontSize="md" bold mb={1}>
    {rocket_name}
   </Text>
   <Text>{launch_site?.site_name_long}</Text>
   <Text>{mission_name}</Text>
   <Text>{date}</Text>
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
    launch_date_utc
   }
  }
 `;
 const { loading, error, data } = useQuery(UPCOMING_LAUNCHES);
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
 return (
  <LayoutContainer>
   <UpcomingLaunches />
  </LayoutContainer>
 );
};
