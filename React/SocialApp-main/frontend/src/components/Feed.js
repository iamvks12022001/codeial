import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import React, { useContext, useEffect, useState } from 'react';
import Post from './Post';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get('/posts/profile/' + username)
        : await axios.get('posts/timeline/' + user._id);
      console.log('Posts are ' + res);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  const classes = useStyles();
  return (
    <div>
      <Container className={classes.container}>
        {posts.map((p) => {
          return <Post post={p} key={p._id} />;
        })}
      </Container>
    </div>
  );
};

export default Feed;
