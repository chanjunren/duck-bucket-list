// Collection of links to be rendered
import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css'

const NavLinks = props => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL DUCKS</NavLink>
            </li>
            <li>
                <NavLink to="/ul/places">MY BUCKET LIST</NavLink>
            </li>
            <li>
                <NavLink to="/places/new">ADD ITEM</NavLink>
            </li>
            <li>
                <NavLink to="/auth">AUTHENTICATE</NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;