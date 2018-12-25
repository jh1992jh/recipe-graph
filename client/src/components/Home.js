import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries';


class Home extends Component {
  render() {
    return (
      <Query query={GET_ALL_RECIPES} >
      {() => (
        <div className="home">
         <header> 
          
         <div className="header-text">
            <h2>Piece of cake</h2>  
            <h3>Discover</h3>
            <h3>RECIPES</h3>
            <h3>EASY</h3>
          </div>
         </header>
       
        </div>
      )}
      </Query>
      );
    }
  }

  export default Home;
