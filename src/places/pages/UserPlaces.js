import React from 'react';

import {useParams} from 'react-router-dom';

import PlaceList from '../components/PlaceList';
// KEY | ID | IMAGEURL | TITLE | DESCRIPTION | ADDRESS | CREATOR ID | COORDINATES

let HIMALAYANS_LINK = "https://deih43ym53wif.cloudfront.net/everest-base-camp-himalayas-nepal_08bc81b2f2.jpeg"

const DUMMY_DATA = [
    {
        id: "p1",
        imgUrl:`${HIMALAYANS_LINK}`,
        title:"Himalayans",
        description: "Legendary mountain range featuring numerous towering peaks, including Mount Everest.",
        address: "Mountain Range (India, Pakistan, Afghanistan, China, Bhutan and Nepal)",
        creatorId: "duck1",
        coordinates: {
            latitude: 30.0925684,
            longtitude: 76.5389941
        }
    },
    {
        id: "p2",
        imgUrl:"https://deih43ym53wif.cloudfront.net/everest-base-camp-himalayas-nepal_08bc81b2f2.jpeg",
        title:"Himalayans",
        description: "Legendary mountain range featuring numerous towering peaks, including Mount Everest.",
        address: "Mountain Range (India, Pakistan, Afghanistan, China, Bhutan and Nepal)",
        creatorId: "duck2",
        coordinates: {
            latitude: 30.0925684,
            longtitude: 76.5389941
        }
    }
]

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_DATA.filter(place => place.creatorId === userId);

    return <PlaceList places={loadedPlaces}/>
}

export default UserPlaces;
