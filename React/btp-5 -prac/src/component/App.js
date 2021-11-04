import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../action/posts';
//import PropTypes from 'prop-types';
import firebase from 'firebase/app';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Navbar, Home, Page404, Login, Signup } from './index';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import { authenticateUser } from '../action/auth';

const setting = () => {
  return <div>setting</div>;
};

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};
class App extends React.Component {
  componentDidMount() {
    // this.props.dispatch(fetchPosts());
    firebase
      .firestore()
      .collection('data')
      .onSnapshot((snapshot) => {
        console.log('snapshot :', snapshot);
        this.props.dispatch(fetchPosts());
      });
    const token = localStorage.getItem('token');

    if (token) {
      const user = jwt_decode(token);
      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name, //we do not want to store all the things,store which we want to
        })
      );
    }
  }

  render() {
    console.log('Props ', this.props);
    const { posts, auth } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path="/login" component={Login} />
            {/* <Route path="/logout" component={Logout} /> */}
            <Route path="/signup" component={Signup} />
            <PrivateRoute
              path="/settings"
              component={setting}
              isLoggedin={auth.isLoggedin}
            />
            {/* <Postlist posts={posts} />*/}
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}
App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
