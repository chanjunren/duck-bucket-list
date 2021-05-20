import React from 'react';

import Input from '../../shared/components/formElements/Input';
import Button from '../../shared/components/formElements/Button';

import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/FormValidators';

import './NewPlace.css'
import { useForm } from '../../shared/components/hooks/FormHook';

const initialInputs = {
  titleInput: {
    value: '',
    isValid: false
  }, 
  descriptionInput: {
    value: '',
    isValid: false
  }
};

const NewPlace = () => {
  const [formState, inputHandler] = useForm(initialInputs, false);
  
  const submitNewPlaceHandler = event => {
    event.preventDefault();
    console.log(JSON.stringify(formState.inputs));
  };

  return <form className="place-form">
    <Input
      id="titleInput" 
      element="input" 
      type="text"
      onInput={inputHandler}
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid title"/>
    <Input 
      id="descriptionInput"
      element="textarea" 
      type="text" 
      onInput={inputHandler}
      label="Description"
      validators={[VALIDATOR_MINLENGTH(10)]}
      errorText="Please enter a description of at least 10 characters"/>
    <Input
      id="addressInput" 
      element="input" 
      type="text"
      onInput={inputHandler}
      label="Address"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid address"/>
    <Button
        type="submit"
        disabled={!formState.isValid}
        onClick={submitNewPlaceHandler}
        >
        ADD PLACE
      </Button>
  </form>
};

export default NewPlace;