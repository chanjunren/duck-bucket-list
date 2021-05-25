import React, { useContext, useState } from 'react';

import Card from '../../shared/components/uiElements/Card';
import Button from '../../shared/components/formElements/Button';
import Modal from '../../shared/components/uiElements/Modal';
import Map from '../../shared/components/uiElements/Map';
import './PlaceItem.css';

import { AuthContext } from '../../shared/components/context/AuthContext';

// KEY | ID | IMAGEURL | TITLE | DESCRIPTION | ADDRESS | CREATOR ID | COORDINATES
const PlaceItem = props => {
  const authContext = useContext(AuthContext);

  const [isMapModalVisible, toggleMapModal] = useState(false);
  const mapModalEventHandler = () => {
      console.log("Handler triggered: " + isMapModalVisible);
      toggleMapModal(!isMapModalVisible);
  }

  const [isDeleteModalVisible, toggleDeleteModal] = useState(false);
  const deleteModalEventHandler = () => {
    toggleDeleteModal(!isDeleteModalVisible);
  }

  const deleteEventHandler = () => {
    console.log("DELETE EVENT CALLED");
    toggleDeleteModal();
  }

  return (
    <React.Fragment>
      <Modal
        show={isMapModalVisible}
        onCancel={mapModalEventHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={mapModalEventHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        header="Are you sure?" 
        show={isDeleteModalVisible}
        onCancel={deleteModalEventHandler}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={deleteModalEventHandler}>CANCEL</Button>
            <Button danger onClick={deleteEventHandler}>DELETE</Button>
          </React.Fragment>
        }>
          <p>Are you sure you want to remove this? D:</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={mapModalEventHandler}>VIEW ON MAP</Button>
            {authContext.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
            {authContext.isLoggedIn && <Button danger onClick={deleteModalEventHandler}>DELETE</Button>}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;