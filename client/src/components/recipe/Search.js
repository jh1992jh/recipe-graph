import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_RECIPES } from '../../queries';
import RecipeItem from './RecipeItem';
import MobileRecipeItem from './MobileRecipeItem';


class Search extends Component {
    state = {
        searchResults: [],
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

    handleChange = ({ searchRecipes }) => {
        this.setState({ searchResults: searchRecipes });
    }
  render() {
      const { searchResults, mobile } = this.state;
      let outputRecipes;

      if(mobile) {
        outputRecipes = (
            searchResults.map(recipe => (
            <MobileRecipeItem key={recipe._id} {...recipe} />
        ))
    )
      } else {
        outputRecipes = (
                searchResults.map(recipe => (
                <RecipeItem key={recipe._id} {...recipe} />
            ))
        )
      }
    return (
      <ApolloConsumer>
        {(client) => (
            <div className="search">
                <div className="search-input-container">
                    <input type="search" 
                    placeholder="Search For Recipes" 
                    onChange={async (e) => {
                        e.persist()
                        const { data } = await client.query({
                            query: SEARCH_RECIPES,
                            variables: { searchTerm: e.target.value}
                        })

                        this.handleChange(data);
                    }}
                    name="" />
                    {searchResults.length === 0 ? <p>Search for Recipes</p> : null }
                </div>
                <div className="search-results">
                    {outputRecipes}
                </div>
            </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default Search;