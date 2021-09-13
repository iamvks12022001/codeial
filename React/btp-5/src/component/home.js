import React, { Component } from 'react';
import { Postlist, FriendsList } from './';

export default class Home extends Component {
  render() {
    const { posts, friends, isLoggedin } = this.props;
    console.log('home props', this.props);
    return (
      <div className="home">
        <Postlist posts={posts} />
        {isLoggedin && <FriendsList friends={friends} />}
      </div>
    );
  }
}
