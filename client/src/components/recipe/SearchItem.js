import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({_id, name, category, likes }) => (
    <div className="SearchItem">
        <Link to={`/recipe/${_id}`}>
        <h3>{name}</h3>
        </Link>
        <h4>Likes: {likes}</h4>
        <h3>{category}</h3>
    </div>
)

export default SearchItem;