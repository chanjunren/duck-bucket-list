import React, { useContext, useState } from 'react';


import Input from '../../shared/components/formElements/Input';
import Button from '../../shared/components/formElements/Button';
import Card from '../../shared/components/uiElements/Card';
import './Auth.css'

import { AuthContext } from '../../shared/components/context/AuthContext';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/FormValidators';
import { useForm } from '../../shared/components/hooks/FormHook';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';

const Auth = props => {
    const [formState, inputHandler, setFormData] = useForm({}, false);

    const [isLoginMode, toggleLoginMode] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [errorEncountered, setErrorEncountered] = useState();

    const authContext = useContext(AuthContext);

    const switchButtonHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                nameInput: undefined

            }, formState.inputs.emailInput.isValid && formState.inputs.passwordInput.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                nameInput: {
                    value: '',
                    isValid: false
                },
            }, false);
        };

        console.log("Form Data: " + JSON.stringify(formState));


        toggleLoginMode(currentMode => !currentMode);
    }

    const onLoginHandler = async event => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formState.inputs.emailInput.value,
                    password: formState.inputs.passwordInput.value
                })
            });
            const responseData = await response.json();
            console.log(responseData);
            setIsLoading(false);
            authContext.login();
        } catch (err) {  // Thrown if the request cannot be sent
            console.error(err);
            setIsLoading(false);
            setErrorEncountered(err.message || 'Where did the err.message go D:');
        }
    }

    const onSignUpHandler = async event => {
        event.preventDefault();
        console.log("SIGN UP: " + formState.inputs);
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formState.inputs.nameInput.value,
                    email: formState.inputs.emailInput.value,
                    password: formState.inputs.passwordInput.value,
                    imageUrl: "https://www.pinclipart.com/picdir/middle/531-5312019_kawaii-clipart-duck-picture-kawaii-cute-duck-cartoon.png"
                })
            });
            const responseData = await response.json();
            console.log(responseData);
        } catch (err) {  // Thrown if the request cannot be sent
            console.error(err);
        }
    }

    return (
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
            <h2>{isLoginMode ? "Hello!" : "Welcome >:D"}</h2>
            <hr />
            <form>
                {!isLoginMode && <Input
                    id="nameInput"
                    element="input"
                    validators={[VALIDATOR_REQUIRE()]}
                    type="text"
                    label="Name"
                    onInput={inputHandler}
                    errorText="Please enter a valid name"
                />}
                <Input
                    id="emailInput"
                    element="input"
                    validators={[VALIDATOR_EMAIL()]}
                    type="email"
                    label="Email"
                    onInput={inputHandler}
                    errorText="Please enter a valid email"
                />
                <Input
                    id="passwordInput"
                    element="input"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    type="text"
                    label="Password"
                    onInput={inputHandler}
                    errorText="Please enter a valid password"
                />
                <Button
                    inverse
                    type="Submit"
                    disabled={!formState.isValid}
                    onClick={isLoginMode ? onLoginHandler : onSignUpHandler}
                >{isLoginMode ? "Log In" : "Sign Up"}</Button>
            </form>

            <Button
                inverse
                // type="Submit"
                onClick={switchButtonHandler}
            >Switch to {isLoginMode ? "Sign Up" : "Log in"}</Button>
        </Card>

    )
};

export default Auth;