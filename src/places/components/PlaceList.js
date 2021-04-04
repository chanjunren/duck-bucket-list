import React from 'react';

import Card from  '../../shared/UiElements/Card';
import PlaceItem from './PlaceItem';

import './PlaceList.css';

// key | id | imgUrl | title | description | address | creatorId | coordinates
const PlaceList = props => {
    if (props.places.length === 0) {
        return (
            <Card>
                <h2>No places found... You pabo! Is there nothing you want to see before you die?</h2>
                <button>Add a place you fool</button>
            </Card>
        );
    } else {
        return (
            <ul className="place-list">
                {props.places.map(place => {
                    return (
                        <PlaceItem
                            key={place.id}
                            id={place.id}
                            imgUrl={place.imgUrl}
                            title={place.title}
                            description={place.description}
                            address={place.address}
                            creatorId={place.creatorId}
                            coordinates={place.coordinates}
                        />
                    );
                })}      
            </ul>
        );
    }
};

export default PlaceList;