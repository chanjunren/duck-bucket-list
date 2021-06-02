import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/uiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';

import useHttpClient from '../../shared/components/hooks/HttpHook';

const UserPlaces = () => {
  const { isLoading, errorEncountered, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const userId = useParams().userId;

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        console.log(`Sending to: http://localhost:5000/api/places/user/${userId}`);
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setLoadedPlaces(responseData.user_places);

      } catch (err) {
        console.error(err);
      }
    }
    fetchUserPlaces();
  }, [sendRequest])



  return <React.Fragment>
    <ErrorModal errorMessage={errorEncountered} onClear={clearError}/>
    {isLoading && (<div className="center">
      <LoadingSpinner />
    </div>)}
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
  </React.Fragment>;
};

export default UserPlaces;
