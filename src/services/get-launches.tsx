import { gql, useQuery } from '@apollo/client';

export default {
 useGetUpComingLaunches: () => {
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
  return useQuery(UPCOMING_LAUNCHES);
 },
 useGetUpComingLaunchesDetails: ({ id }) => {
  const Query = gql`query{
        launch(id: ${id}) {
           id
           mission_name
           rocket {
             rocket_name
             rocket_type
           }
           links {
             mission_patch_small
             mission_patch
           }
           ships {
             active
             attempted_landings
             image
           }
       
           launch_date_utc
           launch_site {
             site_name_long
           }
           is_tentative
           details
           launch_year
         }
       
       }`;
  return useQuery(Query);
 },
 useGetAboutMission: ({ mission_id }) => {
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
  return useQuery(getMission);
 },
 useGetPastLaunches: () => {
  const LAUNCHED_QUERY = gql`
   query {
    launchesPast(limit: 20) {
     id
     mission_id
     launch_date_local
     launch_site {
      site_name_long
     }
     links {
      article_link
      video_link
      mission_patch
      mission_patch_small
     }
     rocket {
      rocket_name
      rocket_type
     }
    }
   }
  `;
  return useQuery(LAUNCHED_QUERY);
 },
};
