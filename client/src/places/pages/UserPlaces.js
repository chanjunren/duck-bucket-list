import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Himalayans',
    description: 'Legendary mountain range featuring numerous towering peaks, including Mount Everest!',
    imageUrl:
      'https://deih43ym53wif.cloudfront.net/everest-base-camp-himalayas-nepal_08bc81b2f2.jpeg',
    address: 'Mountain Range (India, Pakistan, Afghanistan, China, Bhutan and Nepal)',
    location: {
      lat: 30.0925684,
      lng: 76.5389941
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'The Lofoten Islands',
    description: 'Lofoten is known for excellent fishing, nature attractions such as the northern lights and the midnight sun, and small villages off the beaten track',
    imageUrl:
      'https://img.traveltriangle.com/blog/wp-content/uploads/2018/11/lofoten1.jpg',
    address: '8314 Gimsøysand, Norway',
    location: {
      lat: 68.4716466,
      lng: 13.8568658
    },
    creator: 'u1'
  }
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
