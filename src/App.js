import React from 'react';
// curly brackets to target specific exports
// as => alias
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import Users from './users/pages/Users'
import NewPlace from './places/pages/NewPlace'

function App() {
  return <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Users/>
      </Route>
      <Route path="/places/new" exact>
        <NewPlace/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  </BrowserRouter>
}
export default App;
