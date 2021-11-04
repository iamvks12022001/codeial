import { UPDATE_POSTS } from '../action/actionTypes';

export default function posts(state = [], action) {
  console.log('Action :', action);
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    default:
      return state;
  }
}
