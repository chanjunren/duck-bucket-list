import React, { useEffect, useState, useContext } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import Button from '../../shared/components/formElements/Button';
import Input from '../../shared/components/formElements/Input';
import { useForm } from '../../shared/components/hooks/FormHook';
import useHttpClient from '../../shared/components/hooks/HttpHook';
import { AuthContext } from '../../shared/components/context/AuthContext';

import Card from '../../shared/components/uiElements/Card';
import ErrorModal from '../../shared/components/uiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/FormValidators';

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const history = useHistory();
  const context = useContext(AuthContext);
  const [identifiedPlace, setIdentifiedPlace] = useState();

  const initialInputs = {
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    }
  };
  const [formState, inputHandler, setFormData] = useForm(initialInputs, false);

  const { isLoading, errorEncountered, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const loadIdentifiedPlace = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
        setIdentifiedPlace(responseData.place);

        setFormData({
          title: {
            value: responseData.place.title,
            isValid: true
          },
          description: {
            value: responseData.place.description,
            isValid: true
          },
          address: {
            value: responseData.place.address,
            isValid: true
          }
        }, true);
      } catch (err) {
        console.error("Error while loading identified place:  " + err);
      }
    }
    loadIdentifiedPlace();
  }, [sendRequest, placeId, setFormData])




  const submitFormHandler = async event => {
    event.preventDefault();
    console.log("Submitting: " + JSON.stringify(formState));
    try {
      await sendRequest(`http://localhost:5000/api/places/${placeId}`, 'PATCH', JSON.stringify({
        address: formState.inputs.address.value,
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      }),
        { "Content-Type": "application/json" });

      history.push('/' + context.userId + "/places");
    } catch (err) {

    }
  }

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place! :(</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <React.Fragment>
      <ErrorModal onClear={clearError} errorMessage={errorEncountered} />
      <form className="place-form">
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          onInput={inputHandler}
          initialValue={identifiedPlace.title}
          initialValid={true}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title" />
        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description"
          onInput={inputHandler}
          initialValue={identifiedPlace.description}
          initialValid={true}
          validators={[VALIDATOR_MINLENGTH(10)]}
          errorText="Please enter a description of at least 10 characters" />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          onInput={inputHandler}
          initialValue={identifiedPlace.address}
          initialValid={true}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address" />
        <Button
          type="submit"
          disabled={!formState.isValid}
          onClick={submitFormHandler}
        >
          UPDATE
            </Button>
      </form>

    </React.Fragment>
  );

};

export default UpdatePlace;