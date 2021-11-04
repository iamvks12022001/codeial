import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
  SIGNUP_START,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  CLEAR_AUTH_STATE,
} from './actionTypes';
import { APIUrls } from '../helpers/urls';
//import { getFormBody } from '../helpers/utils';

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
export function getUserdata(idToken) {
  const url = APIUrls.getuserdata();
  console.log('URll', url);
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idToken: idToken,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('data 8989', data.users.displayName);
      return data;
    })
    .catch((e) => {
      console.log('error', e);
    });
}
export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, //we do this because our APi not accept json,it accept url encoded
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        //basically data have token which we need to keep it safe

        if (data.localId) {
          const user = getUserdata(data.idToken);
          dispatch(loginSuccess(user.users.email));
          localStorage.setItem('idToken', data.idToken);
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}
//we use getFormBody so to get url code like /login?email="a@gmail.com"&password="34"

//for signup
export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}

export function signup(email, password) {
  return (dispatch) => {
    const url = APIUrls.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data 123', data);
        if (data.localId) {
          // do something
          const user = getUserdata(data.idToken);
          localStorage.setItem('idToken', data.idToken);
          dispatch(signupSuccessful(user.displayName));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

export function startSingup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}

export function signupSuccessful(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
