import React from 'react';

import UsersList from '../components/UsersList';

const DUCK_DP_URL = "https://www.pinclipart.com/picdir/middle/531-5312019_kawaii-clipart-duck-picture-kawaii-cute-duck-cartoon.png"

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Ong Beng Chia',
      image:
        `${DUCK_DP_URL}`,
      places: 3
    },
    {
      id: 'u2',
      name: 'Kaisocool',
      image:
      `${DUCK_DP_URL}`,
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
