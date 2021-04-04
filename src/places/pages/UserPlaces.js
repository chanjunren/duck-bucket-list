import React from 'react';

import PlaceList from '../components/PlaceList';
// KEY | ID | IMAGEURL | TITLE | DESCRIPTION | ADDRESS | CREATOR ID | COORDINATES

const DUMMY_DATA = [
    {
        id: "duck1",
        imgUrl:"https://deih43ym53wif.cloudfront.net/everest-base-camp-himalayas-nepal_08bc81b2f2.jpeg",
        title:"Himalayans",
        description: "Legendary mountain range featuring numerous towering peaks, including Mount Everest.",
        address: "Mountain Range (India, Pakistan, Afghanistan, China, Bhutan and Nepal)",
        creatorId: "Ong Beng Chia",
        coordinates: {
            latitude: 30.0925684,
            longtitude: 76.5389941
        }
    },
    {
        id: "duck2",
        imgUrl:"https://deih43ym53wif.cloudfront.net/everest-base-camp-himalayas-nepal_08bc81b2f2.jpeg",
        title:"Himalayans",
        description: "Legendary mountain range featuring numerous towering peaks, including Mount Everest.",
        address: "Mountain Range (India, Pakistan, Afghanistan, China, Bhutan and Nepal)",
        creatorId: "Ong Beng Chia",
        coordinates: {
            latitude: 30.0925684,
            longtitude: 76.5389941
        }
    }
]

const UserPlaces = () => {
    return <PlaceList places={DUMMY_DATA}/>
}

export default UserPlaces;