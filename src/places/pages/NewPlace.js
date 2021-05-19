import React, { useCallback } from 'react';

import Input from '../../shared/components/FormElements/Input';

import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/FormValidators';

import './NewPlace.css'

const NewPlace = () => {
  const titleInputHandler = useCallback((id, value, isValid) => {
    
  }, []);

  const descriptionInputHandler = useCallback((id, value, isValid) => {
    
  }, []);

  return <form className="place-form">
    <Input
      id="title-input" 
      element="input" 
      type="text"
      onInput={titleInputHandler}
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid title"/>
    <Input 
      id="description-input"
      element="textarea" 
      type="text" 
      onInput={descriptionInputHandler}
      label="Description"
      validators={[VALIDATOR_MINLENGTH(10)]}
      errorText="Please enter a description of at least 10 characters :)"/>
  </form>
};

export default NewPlace;