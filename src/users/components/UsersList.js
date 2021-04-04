import React from 'react';

import UserItem from './UserItem'
import './UsersList.css'

const UsersList = props => {
    if (props.users.length === 0) {
        return <div className="center">
            <h2>No ducks found :(</h2>
        </div>
    }
    return <ul className="users-list">
        {props.users.map(user => {
            return <UserItem 
                key={user.id} 
                id={user.id}
                image={user.image} 
                name={user.name}
                placeCount={user.placeCount}/>
        })}
    </ul>
}

export default UsersList;