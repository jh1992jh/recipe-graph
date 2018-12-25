import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_USER_RECIPES } from '../../queries';
import Loading from '../Loading';

const PVIDRecipes = ({ username }) => (
    <Query query={GET_USER_RECIPES} variables={{username}}>
        {({data, loading, error}) => {
            if(loading) return <Loading />
            if(error) console.log(error);

            return (
                <div className="user-recipes">
                    <h3>Recipes:</h3>
                    <ul>
                        {!data.getUserRecipes.length && <p>No Recipes written yet</p>}
                        {data.getUserRecipes.map(recipe => (
                            <li key={recipe._id} className="user-recipe">
                                <Link to={`/recipe/${recipe._id}`}>
                                  <img src={recipe.imageUrl} alt="recipe" className="user-recipe-img" />  <span>{recipe.name}</span>
                                </Link>   
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }}
    </Query>
);

export default PVIDRecipes;

