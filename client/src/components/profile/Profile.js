import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import UserInfo from './UserInfo';
import UserFavorites from './UserFavorites';
import UserRecipes from './UserRecipes';
import withAuth from '../withAuth';


class Profile extends Component {
  render() {
    const { session } = this.props;
    
    
    return (
      <div className="profile">
      <UserInfo session={session} />
      <div className="favorites-and-recipes">
        <UserFavorites session={session}/>
        <UserRecipes username={session.getCurrentUser.username} />
      </div>
      </div>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Profile)); 