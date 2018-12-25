import React, { Component } from 'react'
import  { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { SIGNUP_USER } from '../../queries';


const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    errors: {}
}

class Signup extends Component {
    state = {...initialState};

    componentDidMount() {
        if(this.props.session.getCurrentUser !== null) this.props.history.push('/');
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e, signupUser) => {
        e.preventDefault();
        
        signupUser()
            .then(async({data}) => {
               
                localStorage.setItem('token', data.signupUser.token);
                await this.props.refetch();
                this.clearState();
                this.props.history.push('/');
            })
    } 

    validateForm = () => {
        const { username, password, confirmPassword, email } = this.state;

        const isInvalid = !username || !email || !password || !confirmPassword;

        return isInvalid;
    }

    clearState = () => {
        this.setState({...initialState})
    }
  render() {
      const { username, password, confirmPassword, email } = this.state;
    return (
      <Mutation mutation={SIGNUP_USER} variables={{username, password, email, confirmPassword}}>
        {(signupUser, {data, loading, error}) => {
     
            let usernameErr;
            let passwordErr;
            let confirmPasswordErr;
            let emailErr;

            if(error) {
                let err = JSON.parse(error.graphQLErrors[0].message)
                usernameErr = err.username;
                passwordErr = err.password;
                confirmPasswordErr = err.confirmPassword;
                emailErr = err.email;
            }
            return (
                <div className="signup">
                <form className="signupForm" noValidate onSubmit={(e) => this.handleSubmit(e, signupUser)}>
                    <h3>Sign Up</h3>
                    <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="Username"/>
                    {usernameErr !== undefined && usernameErr.length > 0 ? <span className="error">{usernameErr}</span> : null}
                    <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password"/>               {passwordErr !== undefined && passwordErr.length > 0 ? <span className="error">{passwordErr}</span> : null}     
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} placeholder="Confirm Password"/>
                    {confirmPasswordErr !== undefined && confirmPasswordErr.length > 0 ? <span className="error">{confirmPasswordErr}</span> : null}   
                    <input type="email" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
                    {emailErr !== undefined && emailErr.length > 0 ? <span className="error">{emailErr}</span> : null}
                    <button disabled={loading || this.validateForm()} type="submit">Submit</button>
                    
                </form>
            </div>
            )
        }}
      </Mutation>
    )
  }
}

export default withRouter(Signup);