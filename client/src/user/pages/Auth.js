import React, { useContext, useState } from 'react';


import Input from '../../shared/components/formElements/Input';
import Button from '../../shared/components/formElements/Button';
import Card from '../../shared/components/uiElements/Card';
import ErrorModal from '../../shared/components/uiElements/ErrorModal';
import './Auth.css';

import { AuthContext } from '../../shared/components/context/AuthContext';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/FormValidators';
import { useForm } from '../../shared/components/hooks/FormHook';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';
import useHttpClient from '../../shared/components/hooks/HttpHook';

const Auth = props => {
    const [formState, inputHandler, setFormData] = useForm({}, false);

    const [isLoginMode, toggleLoginMode] = useState(true);

    const { isLoading, errorEncountered, sendRequest, clearError } = useHttpClient();

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
            const responseData = await sendRequest('http://localhost:5000/api/users/login',
                'POST',
                JSON.stringify({
                    email: formState.inputs.emailInput.value,
                    password: formState.inputs.passwordInput.value
                }),
                {
                    "Content-Type": "application/json"
                }
            );

            authContext.login(responseData.id);
        } catch (err) { }
    }

    const onSignUpHandler = async event => {
        event.preventDefault();
        try {
            const responseData = await sendRequest('http://localhost:5000/api/users/signup',
                'POST',
                JSON.stringify({
                    name: formState.inputs.nameInput.value,
                    email: formState.inputs.emailInput.value,
                    password: formState.inputs.passwordInput.value,
                    imageUrl: "https://www.pinclipart.com/picdir/middle/531-5312019_kawaii-clipart-duck-picture-kawaii-cute-duck-cartoon.png"
                }),
                {
                    "Content-Type": "application/json"
                }
            );
            console.log("Signup Response Data: " + JSON.stringify(responseData));
            authContext.login(responseData.id);
        } catch (err) { }
    }

    return (
        <React.Fragment>
            <ErrorModal
                onClear={clearError}
                errorMessage={errorEncountered}
            />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
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
                        type="password"
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

        </React.Fragment>

    )
};

export default Auth;