import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function ProfileRightBar({ user }) {
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user._id)
  );

  const body = {};
  const handleClick = async () => {
    try {
      await axios.put(`/users/${user._id}/unfollow`, body, {
        headers: {
          Authorization: 'bearer ' + currentUser.token,
        },
      });
      dispatch({ type: 'UNFOLLOW', payload: user._id });

      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickFollow = async () => {
    try {
      console.log(followed);
      await axios.put(`/users/${user._id}/follow`, body, {
        headers: {
          Authorization: 'bearer ' + currentUser.token,
        },
      });
      dispatch({ type: 'FOLLOW', payload: user._id });

      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box mt={20}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant='h4' component='h2'>
              About Me
            </Typography>
            <Typography gutterBottom variant='h6' component='h3'>
              Bio
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Fugiat quis irure ut reprehenderit esse.
            </Typography>
            <Typography gutterBottom variant='h6' component='h3'>
              Religion
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Satanist
            </Typography>
            <Typography gutterBottom variant='h6' component='h3'>
              Relationship Status
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Single
            </Typography>
            <Typography gutterBottom variant='h6' component='h3'>
              City
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Pune
            </Typography>
            <Typography gutterBottom variant='h6' component='h3'>
              From
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Sitapur
            </Typography>
          </CardContent>
        </CardActionArea>
        {currentUser._id === user._id ? (
          <></>
        ) : (
          <CardActions>
            {followed ? (
              <Button size='small' color='primary' onClick={handleClick}>
                UnFollow
              </Button>
            ) : (
              <Button size='small' color='primary' onClick={handleClickFollow}>
                Follow
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    </Box>
  );
}

export default ProfileRightBar;
