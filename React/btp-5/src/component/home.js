import React, { Component } from 'react';
import { Postlist } from './';

export default class Home extends Component {
  render() {
    const { posts } = this.props;
    console.log('home props', this.props);
    return (
      <div className="home">
        <Postlist posts={posts} />
      </div>
    );
  }
}
