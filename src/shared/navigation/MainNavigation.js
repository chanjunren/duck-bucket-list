// Component for the links
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UiElements/Backdrop';

import './MainNavigation.css'

const MainNavigation = props => {
    const [isDrawerOpen, toggleDrawer] = useState(false);

    const toggleSideDrawerHandler = () => {
        toggleDrawer(!isDrawerOpen);
    };

    return (
        <React.Fragment>
            {isDrawerOpen && <Backdrop onClick={toggleSideDrawerHandler}></Backdrop>}
            {isDrawerOpen && (<SideDrawer>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks/>
                </nav>
            </SideDrawer>)};
            
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={toggleSideDrawerHandler}>
                    <span/>
                    <span/>
                    <span/>
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Your Places</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks/>
                </nav>
            </MainHeader>
        </React.Fragment>
        
    );
};

export default MainNavigation;