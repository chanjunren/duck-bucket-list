import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import './NavLinks.css';

const NavLinks = props => {
  const authContext = useContext(AuthContext);

  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
    <li>
      {authContext.isLoggedIn && <NavLink to="/u1/places">MY PLACES</NavLink>}
    </li>
    <li>
      {authContext.isLoggedIn && <NavLink to="/places/new">ADD PLACE</NavLink>}
    </li>
    <li>
      {!authContext.isLoggedIn && <NavLink to="/auth">AUTHENTICATE</NavLink>}
    </li>
  </ul>
};

export default NavLinks;