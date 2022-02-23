import React, { Component } from 'react';
import { clearAuthState, login } from '../action/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
      //we don't have dispatch function right now ,we have to connect first from store
    }
  };
  render() {
    const { error, inProgress, isLoggedin } = this.props.auth; //as auth reducers have this property
    const { from } = this.props.location.state || { from: { pathname: '/' } }; //if props.location not hae from

    if (isLoggedin) {
      return <Redirect to={from} />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging in ...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapSatetoProps(state) {
  return {
    auth: state.auth, //bcz we have auth.jsin reducer
    //basically reducers design the state
  };
}

export default connect(mapSatetoProps)(Login);
