import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/uiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';
import useHttpClient from '../../shared/components/hooks/HttpHook';

const Users = props => {
  const { isLoading, errorEncountered, sendRequest, clearError } = useHttpClient();


  const [loadedUsers, setLoadedUsers] = useState([]);

  useEffect(() => {
    const initializePage = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/api/users");
        setLoadedUsers(responseData.users);
  
      } catch (err) { }
    }
    initializePage();
  
  }, [sendRequest]);

  return (<React.Fragment>
    {isLoading && (<div className="center">
      <LoadingSpinner />
    </div>)}
    {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    <ErrorModal onClear={clearError} errorMessage={errorEncountered} />
  </React.Fragment>)
};

export default Users;
