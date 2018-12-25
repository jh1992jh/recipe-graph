import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Signout from './auth/Singout';
import { NavToggle } from '../images-icons';

class Sidenav extends Component {
  state = {
    show: false
  }

  toggleNav = () => {
    const { show } = this.state;
    this.setState({show: !show});
  }
  render() {
    const { session } = this.props;
    const { show } = this.state;
    return(
      <nav className="sidenav-container">
      <NavToggle toggleNav={this.toggleNav} show={show}/>
      {show ?  session && session.getCurrentUser ? <NavbarAuth session={session} toggleNav={this.toggleNav}/> : <NavbarUnauth toggleNav={this.toggleNav} /> : null }
        
      </nav>
    )
  }
} 

const NavbarAuth = ({ session, toggleNav }) => (
  <div className="side-nav" onClick={toggleNav}>
        <div className="logo-home">
        
            <NavLink to="/">
              <span className="logo-text">
              Piece Of Cake
              </span>
            </NavLink>
        </div>
        <div className="auth-profile-thumbnail">
          <img src={session.getCurrentUser.profilePic} className="auth-profile-img" alt="profile" />
          <h3>{session.getCurrentUser.username}</h3>
        </div>
        <div className="nav-links">
            <NavLink to="/recipes">Recipes</NavLink>
            <NavLink to="/search">Search</NavLink>
            <NavLink to="/add-recipe">Add Recipe</NavLink>
            <NavLink to="/my-profile">My Profile</NavLink>
            <Signout />
        </div>
  </div>
)


const NavbarUnauth = ({ toggleNav }) => (
  <div onClick={toggleNav} className="side-nav">
        <div className="logo-home">
        
            <NavLink to="/">
              <span className="logo-text">
              Piece Of Cake
              </span>
            </NavLink>
        </div>
        <div className="nav-links">
            <NavLink to="/recipes">Recipes</NavLink>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </div>
  </div>
)

export default Sidenav;