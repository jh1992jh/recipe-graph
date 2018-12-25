import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';

import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries';
import Loading from '../Loading';


const initialState = {
    name: '',
    category: 'snack',
    description: '',
    instructions: '',
    username: '',
    imageUrl: '',
    creatorId: ''
}

class AddRecipe extends Component {
    state = {...initialState};

    componentDidMount() {
        this.setState({username: this.props.session.getCurrentUser.username, creatorId: this.props.session.getCurrentUser._id})
    }

    clearState = () => {
        this.setState({...initialState});
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e, addRecipe) => {
        e.preventDefault();
       
        addRecipe()
            .then(({data}) => {
                this.clearState()
                this.props.history.push('/')
            })
    }

    validateForm = () => {
        const { name, category, description, instructions, username } = this.state;

        const isInvalid = !name || !category || !description || !instructions || !username;

        return isInvalid;
    }

    updateCache = (cache, { data: { addRecipe }}) => {
        const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        })
    }
  render() {
    
    const { name, category, description, instructions, username, imageUrl, _id } = this.state;

    return (
      <Mutation 
      mutation={ADD_RECIPE}
      variables={{name, category, description, instructions, username, imageUrl, _id }}
      update={this.updateCache}
      refetchQueries={() => [
          { query: GET_USER_RECIPES, variables: {username}}
      ]}
      >
        {(addRecipe, {data, loading, error }) => {
        let nameErr;
        let descriptionErr;
        let instructionsErr;
        if(loading) return <Loading />
        if(error) {
            let err = JSON.parse(error.graphQLErrors[0].message);
            nameErr = err.name;
            descriptionErr = err.description;
            instructionsErr = err.instructions
        }
        return (
        <div className="add-recipe">
        <form className="add-recipe-form" onSubmit={e => this.handleSubmit(e, addRecipe)}>
            <input type="text" name="name" onChange={this.handleChange} value={name} placeholder="Recipe Name"/>
            {nameErr !== undefined && nameErr.length > 0 ? <span className="error">{nameErr}</span> : null}
            <select name="category" onChange={this.handleChange} value={category}>
                <option value="Snack">Snack</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Breakfast">Breakfast</option>
            </select>
            <input type="text" name="description" onChange={this.handleChange} value={description} placeholder="Description"/>
            {descriptionErr !== undefined && descriptionErr.length > 0 ? <span className="error">{descriptionErr}</span> : null}
            <input type="text" name="imageUrl" onChange={this.handleChange} value={imageUrl} placeholder="Image Url"/>
            <textarea name="instructions" cols="30" rows="10" onChange={this.handleChange} value={instructions} placeholder="Instructions"></textarea>
            {instructionsErr !== undefined && instructionsErr.length > 0 ? <span className="error">{instructionsErr}</span> : null}
            <button type="submit" className="submitBtn">Submit</button>
        </form>
        </div>
        )
        }}
      </Mutation>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddRecipe));