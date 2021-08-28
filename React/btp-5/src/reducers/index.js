import { combineReducers } from 'redux';
import posts from './post';
import auth from './auth';
export default combineReducers({
  posts,
  auth,
});
//above is function calling
//reducers mention this abve states
