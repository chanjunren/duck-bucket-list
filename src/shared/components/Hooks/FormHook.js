import { useCallback, useReducer } from 'react';

const INPUT_ACTION = "INPUT_CHANGE";
const SET_DATA_ACTION = "SET_DATA";

const formReducer = (state, action) => {
    switch (action.type) {
      case `${INPUT_ACTION}`:
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
        // console.log("New state: " + JSON.stringify(newState));
        return newState; 
    case `${SET_DATA_ACTION}`:
        return {
            inputs: action.inputs,
            isValid: action.isValid
        }   
    default:
        return state;
    }
  };

export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
      });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: `${INPUT_ACTION}`,
            inputId: id,
            value: value,
            isValid: isValid
        });
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type:`${SET_DATA_ACTION}`,
            inputs:inputData,
            isValid:formValidity
        })
    }, []);
    return [formState, inputHandler, setFormData];
};