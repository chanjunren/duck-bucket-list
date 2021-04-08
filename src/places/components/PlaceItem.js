import React, {useState} from 'react';

import Card from '../../shared/UiElements/Card';
import Button from '../../shared/formElements/Button';
import Modal from '../../shared/UiElements/Modal';

import './PlaceItem.css'

// KEY | ID | IMAGEURL | TITLE | DESCRIPTION | ADDRESS | CREATOR ID | COORDINATES
const PlaceItem = props => {
    const [isModalVisible, toggleModalVisibility] = useState(false);
    const modalEventHandler = () => {
        console.log("Handler triggered: " + isModalVisible);
        toggleModalVisibility(!isModalVisible);
    }
    return (
        <React.Fragment>
            <Modal show={isModalVisible} 
                onCancel= {modalEventHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={toggleModalVisibility}>CLOSE</Button>}
                >
                    <div className="map-container">
                        <h2>THE MAP</h2>
                    </div>
            </Modal>
            <li className="place-item">
                <Card>
                    <div className="place-item__image">
                        <img src={props.imgUrl} alt={props.title}/>
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={modalEventHandler}>View On Map</Button>
                        <Button to={`/places/${props.id}`}>Edit</Button>
                        <Button danger>Delete</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
        
    )
}

export default PlaceItem;