import React, { Component } from 'react';

class PVIDInfo extends Component {
  render() {
    const { username, bio, profilePic } = this.props;

    return (      
                <div className="user-info">
                    <div className="profile-pic-container">
                        <img src={profilePic} className="profile-pic" alt="profile" />
                    </div>
                    
                    <div className="profile-overview">
                    <h3>{username}</h3>
                    <h3>Bio:</h3>
                            <p>{bio}</p>
                    </div>

                </div>
    )
  }
}

export default PVIDInfo;