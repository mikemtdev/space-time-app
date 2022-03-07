import { gql, useQuery } from '@apollo/client';

export default {
 useGetCapsules: () => {
  const CAPSULES = gql`
   query {
    capsules(find: {}) {
     id
     type
     status
     reuse_count
     original_launch
     missions {
      flight
      name
     }
     landings
     dragon {
      name
      id
     }
    }

    rockets {
     id
     name
     type
     active
     description
     cost_per_launch
     height {
      meters
     }
     engines {
      type
      version
     }
    }
   }
  `;
  return useQuery(CAPSULES);
 },
 useGetDragon: ({ id }) => {
  const Query = gql`
    query {
        dragon(id: "${id}") {
    description
    active
    crew_capacity
    diameter {
      meters
      feet
    }
    id
    type
    wikipedia
    name
    thrusters {
      type
      amount
    }
  }
  }
  `;
  return useQuery(Query);
 },
 useGetRocket: ({ id }) => {
  const Query = gql`
  query{
    rocket(id: "${id}"){
      wikipedia
    type
    success_rate_pct
    stages
    name
    mass {
      kg
      lb
    }
    height {
      feet
      meters
    }
    first_flight
    engines {
      type
    }
    description
    diameter {
      feet
      meters
    }
    active
    cost_per_launch
    country
    company
  }
    
  
  }
  
  `;
  return useQuery(Query);
 },
};
