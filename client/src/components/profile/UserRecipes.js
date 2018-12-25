import React from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER } from '../../queries';
import Loading from '../Loading';

const handleDelete = deleteUserRecipe => {
    deleteUserRecipe()
        .then(({data}) => console.log('Recipe Deleted'))
}

const UserRecipes = ({ username }) => (
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
                                <Mutation 
                                mutation={DELETE_USER_RECIPE} 
                                variables={{_id: recipe._id}}
                                refetchQueries={() => [
                                    { query: GET_ALL_RECIPES },
                                    { query: GET_CURRENT_USER }
                                ]}
                                update={(cache, { data: { deleteUserRecipe}}) => {
                                    const { getUserRecipes } = cache.readQuery({
                                        query: GET_USER_RECIPES,
                                        variables: { username }
                                    });

                                    cache.writeQuery({
                                        query: GET_USER_RECIPES,
                                        variables: { username },
                                        data: {
                                            getUserRecipes: getUserRecipes.filter(recipe => recipe._id !== deleteUserRecipe._id)
                                        }
                                    })
                                }}
                                >
                                   {(deleteUserRecipe, attrs = {}) => (
                                  
                                    <button onClick={() => handleDelete(deleteUserRecipe)}>{attrs.loading ? <span style={{color: 'red'}}>Deleting</span> : 'Delete'}</button>
                                   )}
                                </Mutation>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }}
    </Query>
);

export default UserRecipes;

