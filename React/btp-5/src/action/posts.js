import { UPDATE_POSTS } from './actionTypes';
import { APIUrls } from '../helpers/urls';
export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Data :', data);
        dispatch(updatePosts(data.data.posts));
      })
      .catch((err) => {
        console.log('error :', err);
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
