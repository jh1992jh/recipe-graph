import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';
import LikeRecipe from './LikeRecipe';
import { icons } from '../../images-icons'
import Loading from '../Loading';
 
const SingleRecipe = ({ match }) => {
    const { _id } = match.params;

    return (
        <Query query={GET_RECIPE} variables={{_id}}>

            {({ data, loading, error}) => {
                if(loading) return <Loading />
                if(error) console.log(error);
                
                return (
                    <div className="single-recipe">'
                        <div className="recipe-info-top">
                            <div className="recipe-picture">
                                <img src={data.getRecipe.imageUrl} className="recipe-img" alt="recipe"/>
                            </div>
                            <div className="recipe-info-overview">
                            <h2>{data.getRecipe.name}</h2>
                            <h4>{data.getRecipe.category}</h4>
                            <p>{data.getRecipe.description}</p>
                            <Link to={`/profile/${data.getRecipe.username}`}>
                                <p>{data.getRecipe.username}</p>
                            </Link>
                            <p className="recipe-likes">{data.getRecipe.likes} <img src={icons.knifeAndFork} alt="likes"/> <LikeRecipe _id={_id} /></p>
                            
                            </div>
                        </div>

                        <div className="recipe-instructions">
                        <h2>Instructions</h2>
                        <p>{data.getRecipe.instructions}</p>
                        </div>
                            
                        
                    </div>
                )
            }}
        </Query>
    )
        
    
}

export default withRouter(SingleRecipe);