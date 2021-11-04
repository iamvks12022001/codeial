import { UPDATE_POSTS } from './actionTypes';
//import { APIUrls } from '../helpers/urls';
export function fetchPosts() {
  return (dispatch) => {
    const url =
      'https://firestore.googleapis.com/v1/projects/btp-5-5d21d/databases/(default)/documents/data?key=AIzaSyAlXgvGG5SSa2Uhu5_ZaqITLrukJrgq-Ak';

    fetch(url)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log('Data :', data.documents);
        dispatch(updatePosts(data.documents));
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
