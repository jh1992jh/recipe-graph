import React from 'react';
import { Link } from 'react-router-dom';

const MobileRecipeItem = ({ name, imageUrl, _id}) => (
    <div className="mobile-recipe-item">
        <img src={imageUrl} alt="recipe"/>
        <h3>{name}</h3>
        <Link to={`/recipe/${_id}`}>
            <button>View</button>
        </Link>
    </div>
);

export default MobileRecipeItem;