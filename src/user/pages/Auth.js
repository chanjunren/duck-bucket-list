import React, { useState } from 'react';


import Input from '../../shared/components/formElements/Input';
import Button from '../../shared/components/formElements/Button';
import Card from '../../shared/components/uiElements/Card';

import './Auth.css'

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/FormValidators';
import { useForm } from '../../shared/components/hooks/FormHook';

const Auth = props => {
    const [formState, inputHandler, setFormData] = useForm({}, false);

    const [isLoginMode, toggleLoginMode] = useState(true);

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

        console.log("Form Data: "  + JSON.stringify(formState));
        
        
        toggleLoginMode(currentMode => !currentMode);
    }

    const onLoginHandler = event => {
        event.preventDefault();
        console.log("LOGIN: " + formState.inputs);
        // console.log("Email: " + formState.inputs.emailInput.value);
        // console.log("Password: " + formState.inputs.passwordInput.value);        
    }

    const onSignUpHandler = event => {
        event.preventDefault();
        console.log("SIGN UP: " + formState.inputs);
    }

    return (
        <Card className="authentication">
            <h2>{isLoginMode ? "Hello!" : "Welcome >:D"}</h2>
            <hr/>
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
                onClick={isLoginMode ? onLoginHandler: onSignUpHandler}
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