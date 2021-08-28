import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}
export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }, //we do this because our APi not accept json,it accept url encoded
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        //basically data have token which we need to keep it safe

        if (data.success) {
          //dispatch action to save user
          dispatch(loginSuccess(data.data.user));
          //initialy we save the user info ,later discuss what to do about token,
          //which is present in data.data.token.s
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}
//we use getFormBody so to get url code like /login?email="a@gmail.com"&password="34"
