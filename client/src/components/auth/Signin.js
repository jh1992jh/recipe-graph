import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import  { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';

const initialState = {
    username: '',
    password: ''
}

class Signin extends Component {
    state = {...initialState}

    componentDidMount() {
        if(this.props.session.getCurrentUser !== null) this.props.history.push('/');
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e, signinUser) => {
        e.preventDefault();
        
        signinUser()
            .then(async({data}) => {

                localStorage.setItem('token', data.signinUser.token);
                await this.props.refetch();
                this.clearState();
                this.props.history.push('/');
            })
    } 

    validateForm = () => {
        const { username, password } = this.state;

        const isInvalid = !username || !password;

        return isInvalid;
    }

    clearState = () => {
        this.setState({...initialState})
    }
  render() {
      const { username, password } = this.state;
    return (
      <Mutation mutation={SIGNIN_USER} variables={{username, password}}>
        {(signinUser, {data, loading, error}) => {
            let err;

            if(error) {
                err = (error.graphQLErrors[0].message)
                
            }
            return (
                <div className="signin">
                <form className="signinForm" onSubmit={(e) => this.handleSubmit(e, signinUser)}>
                <h3>Sign In</h3>
                    <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="Username"/>
                    <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password"/>
                    <span className="error">{err}</span>
                    <button disabled={loading || this.validateForm()}type="submit">Submit</button>
                </form>
            </div>
            )
        }}
      </Mutation>
    )
  }
}

export default withRouter(Signin);