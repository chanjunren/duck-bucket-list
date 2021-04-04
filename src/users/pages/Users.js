import React from 'react';

import UsersList from '../components/UsersList';

const DUCK_DP_URL = "https://www.pinclipart.com/picdir/middle/531-5312019_kawaii-clipart-duck-picture-kawaii-cute-duck-cartoon.png"
// const DUCK_DP_URL = "../../resources/duck-1.png";


const Users = () => {
    const DUCKS = [
        {id:"1", image:`${DUCK_DP_URL}`, name:"duck1", placeCount:7},
        {id:"2", image:`${DUCK_DP_URL}`, name:"duck2", placeCount:14},
        {id:"3", image:`${DUCK_DP_URL}`, name:"duck3", placeCount:21},
    ];
    return <UsersList users={DUCKS}/>
}

export default Users;