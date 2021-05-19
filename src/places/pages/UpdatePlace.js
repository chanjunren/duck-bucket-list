import React from 'react';

import { useParams } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/components/Hooks/FormHook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/FormValidators';

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
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'
    }
  ];


const UpdatePlace = () => {
    const submitFormHandler = event => {
        event.preventDefault();
        console.log("Submitting: " + JSON.stringify(formState));
    }    
    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
    // console.log("Identified place: " + JSON.stringify(identifiedPlace));
    const initialInputs = {
        titleInput: {
          value: identifiedPlace.title,
          isValid: true
        }, 
        descriptionInput: {
          value: identifiedPlace.description,
          isValid: true
        },
        addressInput: {
            value: identifiedPlace.address,
            isValid: true
          }
      };
    const [formState, inputHandler] = useForm(initialInputs, true);

    if (!identifiedPlace) {
        return (
            <div className="center">
                <h2>Could not find place! :(</h2>
            </div>
        );
    }

    return (
        <form className="place-form">
            <Input
                id="titleInput" 
                element="input" 
                type="text"
                label="Title"
                onInput={inputHandler}
                initialValue={formState.inputs.titleInput.value}
                initialValid={formState.inputs.titleInput.value}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"/>
            <Input 
                id="descriptionInput"
                element="textarea" 
                type="text" 
                label="Description"
                onInput={inputHandler}
                initialValue={formState.inputs.descriptionInput.value}
                initialValid={formState.inputs.descriptionInput.isValid}
                validators={[VALIDATOR_MINLENGTH(10)]}
                errorText="Please enter a description of at least 10 characters"/>
            <Input
                id="addressInput" 
                element="input" 
                type="text"
                label="Address"
                onInput={inputHandler}
                initialValue={formState.inputs.addressInput.value}
                initialValid={formState.inputs.addressInput.isValid}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address"/>
            <Button
                type="submit"
                disabled={!formState.isValid}
                onClick={submitFormHandler}
            >
                UPDATE
            </Button>        
      </form>
    );
    
};

export default UpdatePlace;