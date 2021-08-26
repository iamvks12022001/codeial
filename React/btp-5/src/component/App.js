import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../action/posts';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Home, Page404, Login } from './index';
import PropTypes from 'prop-types';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  logout = () => {
    return (
      <div>
        <h1>Log-Out</h1>
      </div>
    );
  };
  signup = () => {
    return (
      <div>
        <h1>Register</h1>
      </div>
    );
  };
  render() {
    console.log('Props ', this.props);
    const { posts } = this.props;
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
            <Route path="/logout" component={this.logout} />
            <Route path="/signup" component={this.signup} />
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
  };
}
App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
