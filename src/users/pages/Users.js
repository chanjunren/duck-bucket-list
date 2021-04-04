import React from 'react';

import UsersList from '../components/UsersList';

const DUCK_DP_URL = "https://www.pinclipart.com/picdir/middle/531-5312019_kawaii-clipart-duck-picture-kawaii-cute-duck-cartoon.png"
// const DUCK_DP_URL = "../../resources/duck-1.png";


const Users = () => {
    const DUCKS = [
        {id:"duck1", image:`${DUCK_DP_URL}`, name:"Ong Beng Chia", placeCount:7},
        {id:"duck2", image:`${DUCK_DP_URL}`, name:"Ksc", placeCount:14},
        {id:"duck3", image:`${DUCK_DP_URL}`, name:"Magician", placeCount:21},
    ];
    return <UsersList users={DUCKS}/>
}

export default Users;