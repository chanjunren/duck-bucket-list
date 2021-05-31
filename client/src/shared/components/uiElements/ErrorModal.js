import React from 'react';

import Modal from './Modal';
import Button from '../formElements/Button';

// import './ErrorModal.css';

const ErrorModal = props => {
    return (
        <Modal
            onCancel={props.onClear}
            header="Oh nuuuuus an error occured D:"
            show={!!props.errorMessage}
            footer={<Button onClick={props.onClear}>Oki okies!</Button>}
        >
            <p>{props.errorMessage}</p>
        </Modal>
    );
}

export default ErrorModal