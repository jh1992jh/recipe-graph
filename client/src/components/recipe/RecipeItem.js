import React from 'react';
import { Link } from 'react-router-dom';
import { icons } from '../../images-icons';

const RecipeItem = ({name, category, likes, imageUrl, _id}) => (
    <div className="recipe-item">
        <img src={imageUrl} className="recipe-thumbnail" alt="recipe"/>
        <div className="recipe-overview">
        <Link to={`/recipe/${_id}`}>
            <h3>{name}</h3>
        </Link>
        <p>{category}</p>
        <p className="item-likes">
            <span>
                {likes}
            </span>
            <img src={icons.knifeAndFork} alt="knife and fork"/> 
        </p>
        <Link to={`/recipe/${_id}`}>
            <button>View</button>
        </Link>
        </div>
    </div>
)

export default RecipeItem;