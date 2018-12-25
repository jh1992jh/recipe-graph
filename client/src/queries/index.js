import { gql } from 'apollo-boost';

import { recipeFragments } from './fragments';


/* RECIPE QUERIES */
export const GET_ALL_RECIPES = gql `
    query {
        getAllRecipes {
            _id,
            name
            category
            likes
            imageUrl
        }
    }
`;

export const GET_RECIPE = gql`
    query($_id: ID!) {
        getRecipe(_id: $_id) {
            ...CompleteRecipe
        }
    }
    ${recipeFragments.recipe}
`

export const GET_USER_RECIPES = gql `
    query($username: String!) {
        getUserRecipes(username: $username) {
        _id
        name
        likes
        imageUrl
        }
    }
`

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
      searchRecipes(searchTerm: $searchTerm) {
          _id
          name
          likes
          category
          username
          imageUrl
      }
  }
`;

/* RECIPE MUTATIONS */
export const ADD_RECIPE = gql`
    mutation($name: String!, $category: String!, $description: String!, $instructions: String!, $username: String!, $imageUrl: String) {
        addRecipe(name: $name, category: $category, description: $description, instructions: $instructions, username: $username, imageUrl: $imageUrl) {
           ...CompleteRecipe
        }
    }
    ${recipeFragments.recipe}
`;

export const LIKE_RECIPE = gql`
    mutation($_id: ID!, $username: String!) {
        likeRecipe(_id: $_id, username: $username) {
        ...LikeRecipe
        }
    }
    ${recipeFragments.like}
`;

export const UNLIKE_RECIPE = gql`
    mutation($_id: ID!, $username: String!) {
        unlikeRecipe(_id: $_id, username: $username) {
        ...LikeRecipe
        }
    }
    ${recipeFragments.like}
`

export const DELETE_USER_RECIPE = gql`
  mutation($_id: ID!) {
      deleteUserRecipe(_id: $_id) {
        _id
        name
        category
        description
        instructions
        username
        likes
        imageUrl
      }
  }
`

/* USER QUERIES */
export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            _id
            username
            joinDate
            email
            favorites {
                _id
                name
                imageUrl
            }
            bio
            profilePic
        }
    }
`;

export const GET_PROFILE = gql`

    query($username: String!) {
        getProfile(username: $username) {
        username
        favorites {
            _id
            name
            imageUrl
        }
        bio
        profilePic
        }
    }
`;

/* USER MUTATIONS */
export const SIGNUP_USER = gql`
    mutation($username: String!, $password: String!, $email: String!, $confirmPassword: String!) {
        signupUser(username: $username, password: $password, email: $email, confirmPassword: $confirmPassword) {
        token
        }    
    }
`;

export const SIGNIN_USER = gql`
    mutation($username: String!, $password: String!) {
        signinUser(username: $username, password: $password) {
        token
        }
    }
`

export const EDIT_USER_PROFILE = gql`
    mutation($username: String! ,$bio: String, $profilePic: String) {
        editProfile(username: $username, bio: $bio, profilePic: $profilePic) {
            username
            joinDate
            email
            favorites {
                _id
                name
            }
            bio
            profilePic
        }
    }
`