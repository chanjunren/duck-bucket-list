import React, {useCallback, useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/components/context/AuthContext'

const App = () => {
  const [isLoggedIn, setLoginState] = useState(false);

  const login = useCallback(() => {
    setLoginState(true);
  }, []);

  const logout = useCallback(() => {
    setLoginState(false);
  }, []);

  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, login:login, logout:logout}}>
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/auth">
            <Auth/>
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/places/:placeId" exact>
            <UpdatePlace/>
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
    </AuthContext.Provider>
  );
};

export default App;
