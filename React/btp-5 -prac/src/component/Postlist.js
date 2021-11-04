import React, { Component } from 'react';
import PropTypes from 'prop-types';
class PostsList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-wrapper" key={post.name}>
            <div className="post-header">
              <div className="post-avatar">
                <img src={post.fields.user_pic.stringValue} alt="user-pic" />
                <div>
                  {console.log('post: ', post.fields.user_pic)}
                  <span className="post-author">
                    {post.fields.user_name.stringValue}
                  </span>
                  <span className="post-time">
                    {post.fields.post_time.timestampValue}
                  </span>
                </div>
              </div>
              <div className="post-content">
                {post.fields.posts.stringValue}
              </div>

              <div className="post-actions">
                <div className="post-like">
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-icon"
                  />
                  <span>{post.fields.like.integerValue}</span>
                </div>

                <div className="post-comments-icon">
                  <img
                    src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                    alt="comments-icon"
                  />
                  <span>{post.fields.comment.integerValue}</span>
                </div>
              </div>
              <div className="post-comment-box">
                <input placeholder="Start typing a comment" />
              </div>

              <div className="post-comments-list">
                <div className="post-comments-item">
                  <div className="post-comment-header">
                    <span className="post-comment-author">Bill</span>
                    <span className="post-comment-time">a minute ago</span>
                    <span className="post-comment-likes">22</span>
                  </div>

                  <div className="post-comment-content">Random comment</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

PostsList.propsType = {
  posts: PropTypes.array.isRequired,
};
// so that mean if we passed props other than
//array or if we not pass any props then it give error
export default PostsList;
