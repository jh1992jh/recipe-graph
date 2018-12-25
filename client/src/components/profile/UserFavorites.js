import React from 'react';
import { Link } from 'react-router-dom';

const UserFavorites = ({session}) => (
    <div className="user-favorites">
       
        <h3>Favorites:</h3>
        <ul className="favorites">
            {session.getCurrentUser.favorites.map(favorite => (
                <li key={favorite._id} className="user-favorite">
                    <Link to={`/recipe/${favorite._id}`}>
                    <img className="user-favorite-img" src={favorite.imageUrl} alt="favorite recipe"/>
                        <span>{favorite.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
        
    </div>
)

export default UserFavorites;