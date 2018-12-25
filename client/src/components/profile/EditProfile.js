import React from 'react';
import { Mutation } from 'react-apollo';
import { EDIT_USER_PROFILE } from '../../queries';

const EditProfile = ({session, handleChange, handleSubmit, username, bio, profilePic, toggleEdit, updateCache}) => (
    <Mutation mutation={EDIT_USER_PROFILE} variables={{username, bio, profilePic}} update={updateCache}>
        {(editProfile, {data, loading, error}) => {
           
            return (
                <div className="edit-profile" onClick={toggleEdit}>
                    <div className="modal">
                        <h3>Edit profile</h3>
                        <img src={profilePic} alt="profile"/>
                        <form className="edit-profile-form" onSubmit={(e) => handleSubmit(e, editProfile)}>
                            <input type="text" onChange={handleChange} value={profilePic} name="profilePic"/>
                            <textarea name="bio" onChange={handleChange} cols="30" rows="10" value={bio}></textarea>
                            <button type="submit" className="save-btn">Save</button>
                        </form>
                    </div>
                 </div>
            )
        }}
    
    </Mutation>
)

export default EditProfile;