import React, { Component } from 'react';
import { createPost } from '../action/posts';
import { connect } from 'react-redux';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  handleOnClick = () => {
    // dispatch action
    this.props.dispatch(createPost(this.state.content));
    this.setState(
      {
        content: '',
      },
      console.log('hiiiiiiiiiii')
    );
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  render() {
    return (
      <div className="create-post">
        <textarea
          className="add-post"
          value={this.state.content}
          onChange={this.handleChange}
        />

        <div>
          <button id="add-post-btn" onClick={this.handleOnClick}>
            Add Post
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(CreatePost);
//i just need dispatch function that why i do not pass any function
