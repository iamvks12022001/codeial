import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../action/posts';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  Navbar,
  Home,
  Page404,
  Login,
  Signup,
  Setting,
  UserProfile,
} from './index';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import { authenticateUser } from '../action/auth';
import { fetchUserFriends } from '../action/friends';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;
  console.log('dwdwdqw', privateRouteProps);
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location, //props.location is object which have pathname as it's key
              },
            }}
          />
        );
      }}
    />
  );
};
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
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
      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    console.log('Props ', this.props);
    const { posts, auth, friends } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedin={auth.isLoggedin}
                  />
                );
              }}
            />
            <Route path="/login" component={Login} />
            {/* <Route path="/logout" component={Logout} /> */}
            <Route path="/signup" component={Signup} />
            <PrivateRoute
              path="/settings"
              component={Setting}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path="/user/:userId" //whatever is passed after : is variable
              component={UserProfile}
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
    friends: state.friends,
  };
}
App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
