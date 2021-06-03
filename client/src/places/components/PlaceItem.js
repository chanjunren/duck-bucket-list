import React, { useContext, useState } from 'react';

import Card from '../../shared/components/uiElements/Card';
import Button from '../../shared/components/formElements/Button';
import Modal from '../../shared/components/uiElements/Modal';
import Map from '../../shared/components/uiElements/Map';
import ErrorModal from '../../shared/components/uiElements/ErrorModal';
import './PlaceItem.css';


import useHttpClient from '../../shared/components/hooks/HttpHook';
import { AuthContext } from '../../shared/components/context/AuthContext';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';

// KEY | ID | IMAGEURL | TITLE | DESCRIPTION | ADDRESS | CREATOR ID | COORDINATES
const PlaceItem = props => {
  const authContext = useContext(AuthContext);
  const { isLoading, errorEncountered, sendRequest, clearError } = useHttpClient();
  const [isMapModalVisible, toggleMapModal] = useState(false);
  const mapModalEventHandler = () => {
      console.log("Handler triggered: " + isMapModalVisible);
      toggleMapModal(!isMapModalVisible);
  }

  const [isDeleteModalVisible, toggleDeleteModal] = useState(false);
  const deleteModalEventHandler = () => {
    toggleDeleteModal(!isDeleteModalVisible);
  }

  const deleteEventHandler = async () => {
    console.log("DELETE EVENT CALLED");
    try {
      await sendRequest(`http://localhost:5000/api/places/${props.id}`, 'DELETE');
      props.onDelete(props.id);
    } catch (err) {
      console.error("Caught error in deleteEventHandler: " + err);
    }
    toggleDeleteModal();
  }

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay/>}
      <ErrorModal onClear={clearError} errorMessage={errorEncountered}/>
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
            {authContext.isLoggedIn && (props.creatorId === authContext.userId) && <Button to={`/places/${props.id}`}>EDIT</Button>}
            {authContext.isLoggedIn && (props.creatorId === authContext.userId) && <Button danger onClick={deleteModalEventHandler}>DELETE</Button>}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
