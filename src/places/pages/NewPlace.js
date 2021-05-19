import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/FormValidators';

import './NewPlace.css'

const initialState = {
  inputs: {
    titleInput: {
      value: '',
      isValid: false
    }, 
    descriptionInput: {
      value: '',
      isValid: false
    }
  },
  isValid: false
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        isValid: formIsValid
      };

      return newState; 
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState)
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      inputId: id,
      value: value,
      isValid: isValid
    });
  }, []);

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