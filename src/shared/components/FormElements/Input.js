import React, {useReducer, useEffect} from 'react';

import {validate} from '../../util/FormValidators';

import './Input.css';

const CHANGE_ACTION = "CHANGE";
const TOUCH_ACTION = "TOUCH";

// Returns new state
const inputReducer = (state, action) => {
    switch (action.type) {
        case CHANGE_ACTION:
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case TOUCH_ACTION:
            return {
                ...state,
                value: action.val,
                isTouched: true
            }
        default:
            return state;
    }
};

const Input = props => {
    // dispatch is a function 
    const [inputState, dispatch] = useReducer(inputReducer, 
        {value:'', isValid: false, isTouched: false});

    const {id, onInput} = props;
    const {value, isValid} = inputState;
    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            val: event.target.value,
            type: `${CHANGE_ACTION}`,
            validators: props.validators
        });
    };

    const touchHandler = event => {
        dispatch({
            val: event.target.value,
            type: `${TOUCH_ACTION}`
        });
    };

    const element = props.element === 'input' ? 
        (<input id={props.id} 
            type={props.type} 
            placeholder={props.placeholder} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />)
        : (<textarea 
            id={props.id} 
            rows={props.row || 3} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />) // if props.row is not defined

    return (<div className={`form-control ${!inputState.isValid && inputState.isTouched && 
        'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>)
};

export default Input;