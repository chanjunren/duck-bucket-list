import React, {useReducer} from 'react';

import './Input.css';

const CHANGE_ACTION = "CHANGE";

// Returns new state
const inputReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case CHANGE_ACTION:
            return {
                ...state,
                value: action.value,
                isValid: true
            };
        default:
            return state;
    }
};

const Input = props => {
    // dispatch is a function 
    const [inputState, dispatch] = useReducer(inputReducer, {type: `${CHANGE_ACTION}`, isValid: false})

    const inputHandler = event => {
        dispatch({
            value: event.target.value,
            type: `${CHANGE_ACTION}`
        });
    };

    const element = props.element === 'input' ? 
        (<input id={props.id} 
            type={props.type} 
            placeholder={props.placeholder} 
            onInput={inputHandler}
            value={inputState.value}
        />)
        : (<textarea 
            id={props.id} 
            rows={props.row || 3} 
            onInput={inputHandler}
            value={inputState.value}
        />) // if props.row is not defined

    return (<div className={`form-control ${!inputState.isValid && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && <p>{props.errorText}</p>}
    </div>)
};

export default Input;