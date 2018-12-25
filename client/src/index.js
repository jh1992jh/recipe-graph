import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import './index.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import withSession from './components/withSession';


import Home from './components/Home';
import RecipePage from './components/recipe/RecipePage';
import AddRecipe from './components/recipe/AddRecipe';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Profile from './components/profile/Profile';
import ProfileViaId from './components/profile/ProfileViaId';
import SingleRecipe from './components/recipe/SingleRecipe';
import Search from './components/recipe/Search';
import Sidenav from './components/Sidenav';


const client = new ApolloClient({
    uri: 'https://recipe-graph.herokuapp.com/graphql',
    fetchOptions: {
        credentials: 'include'
    },

    request: operation => {
        const token = localStorage.getItem('token');

        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },

    onError: (error) => {
        if(error) {
            //console.log('Network Error: ', error)
        }
    }
})

const Root = ({ refetch, session}) => (
    <Router>
    <Fragment>
        <Sidenav session={session}/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recipes" component={RecipePage} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/add-recipe" render={() => <AddRecipe session={session} />} />
            <Route exact path="/recipe/:_id"  component={SingleRecipe} />
            <Route exact path="/signup" render={() => <Signup session={session} refetch={refetch} />} />
            <Route exact path="/signin" render={() => <Signin session={session} refetch={refetch} />} />
            <Route exact path="/my-profile" render={() => <Profile refetch={refetch} session={session} />} 
            />
            <Route exact path="/profile/:username" render={() => <ProfileViaId session={session} />} />
            <Redirect to="/" />
       </Switch>
    </Fragment>   
    </Router>
)

const RootWithSession = withSession(Root);

ReactDOM.render(
    <ApolloProvider client={client}>
    <RootWithSession />
    </ApolloProvider>
    , document.getElementById('root'));

