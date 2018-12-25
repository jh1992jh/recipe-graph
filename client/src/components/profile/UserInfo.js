import React, { Component } from 'react';
import EditProfile from './EditProfile';


class UserInfo extends Component {
    state = {
        bio: '',
        editBioForm: false,
        username: '',
        profilePic: ''
    }

    componentDidMount() {
        const { session } = this.props;
        this.setState({ bio: session.getCurrentUser.bio, username: session.getCurrentUser.username, profilePic: session.getCurrentUser.profilePic})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    } 

    toggleEdit = (e) => {
        const className = e.target.className;

        if(className === 'edit-profile' ||  className === 'saveBtn' || className === 'edit-bio-btn') {
            const { editBioForm } = this.state;
            const { session } = this.props;
            this.setState({editBioForm: !editBioForm})
            if(editBioForm === true) {
                this.setState({ bio: session.getCurrentUser.bio, profilePic: session.getCurrentUser.profilePic});
            }
        } else {
            return 
        }

    }

    handleSubmit = (e, editProfile) => {
        e.preventDefault()
        editProfile().then(({data}) => console.log('Edited'))
        this.setState({editBioForm: false})
        window.location.href = '/profile'
    }

    
    /* updateCache = (cache, { data: {editProfile} }) => {
        const { GET_CURRENT_USER } = cache.readQuery({ query: GET_CURRENT_USER });

        cache.writeQuery({
            query: GET_CURRENT_USER,
            data: {
                getCurrentUser: [editProfile, ...getCurrentUser]
            }
        })
        
    }*/
  render() {
    const { session } = this.props;
    const { bio, editBioForm, username, profilePic } = this.state;

    return (
      
                <div className="user-info">

                    <div className="profile-pic-container">
                        <img src={session.getCurrentUser.profilePic} className="profile-pic" alt="profile"/>
                    </div>
                    
                    <div className="profile-overview">
                    <h3>{session.getCurrentUser.username}</h3>
                    <h3>Bio:</h3>
                    {editBioForm ? (
                            <EditProfile session={session} handleChange={this.handleChange} handleSubmit={this.handleSubmit} bio={bio} profilePic={profilePic} toggleEdit={this.toggleEdit} username={username} updateCache={this.updateCache} />
                        ) : (
                            <p>{session.getCurrentUser.bio}</p>
                    )}
                    
                        <button className="edit-bio-btn" onClick={this.toggleEdit}>Edit Bio</button>
                    
                    </div>

                </div>
    )
  }
}

export default UserInfo;