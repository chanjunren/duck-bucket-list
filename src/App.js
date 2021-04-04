import React from 'react';
// curly brackets to target specific exports
// as => alias
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import Users from './users/pages/Users'
import NewPlace from './places/pages/NewPlace'
import MainNavigation from './shared/navigation/MainNavigation'

function App() {
  return <BrowserRouter>
    <MainNavigation/>
    <main>
      <Switch>
        <Route path="/" exact>
          <Users/>
        </Route>
        <Route path="/places/new" exact>
          <NewPlace/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    </main>
    
  </BrowserRouter>
}
export default App;
