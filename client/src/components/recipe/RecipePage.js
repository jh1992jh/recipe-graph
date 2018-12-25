import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../../queries';
import RecipeItem from './RecipeItem';
import MobileRecipeItem from './MobileRecipeItem';
import Loading from '../Loading';

class RecipePage extends Component {
  state = {
    mobile: false
  }

  componentDidMount() {
    function isMobileDevice() {
      return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

    if(isMobileDevice() === true) {
      this.setState({mobile: true});
      console.log('User is on a mobile device');
    }
  }
  render() {
    const { mobile } = this.state;
    return (
      <div>
      <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error}) => {
        if(loading) return <Loading />
        if(error) console.log(error)
        
        let outputRecipes;

        if(mobile) {
          
          outputRecipes = (
              data.getAllRecipes.map(recipe => (
              <MobileRecipeItem key={recipe._id} {...recipe} />
            ))
          )
        } else {
          outputRecipes = (
              data.getAllRecipes.map(recipe => (
              <RecipeItem key={recipe._id} {...recipe} />
            ))
          )
        }
        return (
          <div className="recipe-page">
          
          <h2>Recipes</h2>
          {outputRecipes}
              
            
          </div>
          
        )
      }} 
    </Query>
      </div>
    )
  }
}

export default RecipePage;