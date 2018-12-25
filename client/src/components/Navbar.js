import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import Signout from './auth/Singout';
import { icons } from '../images-icons';

const Navbar = ({session}) => (
  <nav className="mainNav">
    { session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnauth />}
  </nav>
)

const NavbarAuth = ({ session }) => (
  <Fragment>
        <div className="logoHome">
        <img src={icons.mainlogo} alt="main-logo"/>
            <NavLink to="/">
              <span className="logo-text">
              Piece Of Cake
              </span>
            </NavLink>
        </div>
        <div className="auth-profile-thumbnail">
          <img src={session.getCurrentUser.profilePic} className="auth-profile-img" />
          <h3>{session.getCurrentUser.username}</h3>
        </div>
        <div className="navLinksRight">
            <NavLink to="/recipes">Recipes</NavLink>
            <NavLink to="/search">Search</NavLink>
            <NavLink to="/add-recipe">Add Recipe</NavLink>
            <NavLink to="/profile">My Profile</NavLink>
            <Signout />
        </div>
  </Fragment>
)


const NavbarUnauth = () => (
  <Fragment>
        <div className="logoHome">
        <img src={icons.mainlogo} alt="main-logo"/>
            <NavLink to="/">
              <span className="logo-text">
              Piece Of Cake
              </span>
            </NavLink>
        </div>
        <div className="navLinksRight">
            <NavLink to="/recipes">Recipes</NavLink>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </div>
  </Fragment>
)

export default Navbar;