import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_PROFILE } from '../../queries';
import PVIDInfo from './PVIDInfo';
import PVIDFavorites from './PVIDFavorites';
import PVIDRecipes from './PVIDRecipes';

class ProfileViaId extends Component {
  componentDidMount() {
    if(this.props.match.params.username === this.props.session.getCurrentUser.username) {
      this.props.history.push('/my-profile')
    }
  }
  render() {
    const username = this.props.match.params.username;
    return (
      <Query query={GET_PROFILE} variables={{username}}>
        {({data, loading, error}) => {
           
            if(error) console.log(error)
            if(loading) return <div>Loading</div>
            const { username, bio, favorites, profilePic } = data.getProfile;
            return (
                <div className="profile">
                    <PVIDInfo username={username} bio={bio} profilePic={profilePic} />
                    <div className="favorites-and-recipes">
                        <PVIDFavorites favorites={favorites} />
                        <PVIDRecipes username={username}/>
                    </div>
                </div>
            )
        }}
      </Query>
    )
  }
}

export default withRouter(ProfileViaId);