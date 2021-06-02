import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/formElements/Input';
import Button from '../../shared/components/formElements/Button';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';
import ErrorModal from '../../shared/components/uiElements/ErrorModal';
import { AuthContext } from '../../shared/components/context/AuthContext';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/FormValidators';

import './NewPlace.css'
import { useForm } from '../../shared/components/hooks/FormHook';
import useHttpClient from '../../shared/components/hooks/HttpHook';


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
  const { isLoading, errorEncountered, sendRequest, clearError } = useHttpClient();

  const context = useContext(AuthContext);

  const [formState, inputHandler] = useForm(initialInputs, false);

  // Redirect
  const history = useHistory();

  const submitNewPlaceHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest("http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.titleInput.value,
          description: formState.inputs.descriptionInput.value,
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBHQELPLQtchYmae9xi5Y-85eEIPeV1nvm2w&usqp=CAU",
          address: formState.inputs.addressInput.value,
          creator: context.userId,
        }),
        {
          "Content-Type": "application/json"
        });

        history.push('/');

    } catch (error) {
      console.error("CAUGHT: " + error);
    }

  };

  return <React.Fragment>
    {errorEncountered && <ErrorModal errorMessage={errorEncountered} onClear={clearError}/>}
    <form className="place-form">
      {isLoading && <LoadingSpinner asOverlay/>}
      <Input
        id="titleInput"
        element="input"
        type="text"
        onInput={inputHandler}
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title" />
      <Input
        id="descriptionInput"
        element="textarea"
        type="text"
        onInput={inputHandler}
        label="Description"
        validators={[VALIDATOR_MINLENGTH(10)]}
        errorText="Please enter a description of at least 10 characters" />
      <Input
        id="addressInput"
        element="input"
        type="text"
        onInput={inputHandler}
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address" />
      <Button
        type="submit"
        disabled={!formState.isValid}
        onClick={submitNewPlaceHandler}
      >
        ADD PLACE
      </Button>
    </form>

  </React.Fragment>
};

export default NewPlace;