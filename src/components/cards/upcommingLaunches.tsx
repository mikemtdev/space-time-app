import { useNavigation } from '@react-navigation/core';
import { Center, Image, Pressable, Text } from 'native-base';
import React, { FC } from 'react';

type CardProps = {
 id: string;
 mission_name: string;
 mission_id: string;
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

export const UpComingCard: FC<CardProps> = ({
 id,
 launch_site,
 links: { mission_patch },
 mission_id,
 mission_name,
 rocket: { rocket_name },
}) => {
 const navigation = useNavigation();

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
     source={{ uri: mission_patch }}
     alt="mission_patch"
    />
   </Center>
   <Text fontSize="md" bold mb={1}>
    {rocket_name}
   </Text>
   <Text>{launch_site.site_name_long}</Text>
   <Text>{mission_name}</Text>
  </Pressable>
 );
};
