import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../action/auth';
import { searchUsers } from '../action/search';

class Navbar extends React.Component {
  logOut = () => {
    //link to=> /users/sign-out
    this.props.dispatch(logoutUser());
  };

  handleSearch = (e) => {
    //maintain later
    const searchText = e.target.value;

    this.props.dispatch(searchUsers(searchText));
  };

  render() {
    const { auth, results } = this.props;
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              style={style.img1}
              src="https://cdn-icons.flaticon.com/png/512/2685/premium/2685468.png?token=exp=1643118282~hmac=3070420ace303648a9855fc628d3e3f6"
              alt="logo"
            />
            <span style={style.img2}>Connect With World...</span>
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input placeholder="Search" onChange={this.handleSearch} />
        </div>
        <div className="right-nav">
          {auth.isLoggedin && (
            <div className="user">
              <Link to="/settings">
                <li>
                  <a href="/users/profile/<%= user.id%>"> </a>
                </li>
              </Link>
              <span>{auth.user.name}</span>
            </div>
          )}

          <div className="nav-links">
            <ul>
              {!auth.isLoggedin && (
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              )}

              {auth.isLoggedin && <li onClick={this.logOut}>Log out</li>}

              {!auth.isLoggedin && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
const style = {
  img1: {
    height: 40,
    // position: absolute,
    top: 10,
    left: 7,
  },
  img2: {
    //  position: relative,
    marginLeft: 20,
    left: 15,
    //color: aqua,
  },
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}
export default connect(mapStateToProps)(Navbar);
