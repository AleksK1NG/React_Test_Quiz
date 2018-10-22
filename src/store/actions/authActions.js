import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';
import axios from 'axios';

export const auth = (email, password, isLogin) => async dispatch => {
  const authData = {
    email,
    password,
    returnSecureToken: true
  };

  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBxtx_Klhf8wZamdZsBUz-VABk0F6kKXsI';

  if (isLogin) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBxtx_Klhf8wZamdZsBUz-VABk0F6kKXsI';
  }
  const { data } = await axios.post(url, authData);

  const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

  localStorage.setItem('token', data.idToken);
  localStorage.setItem('userId', data.localId);
  localStorage.setItem('expirationDate', expirationDate);

  dispatch(authSuccess(data.idToken));
  dispatch(autoLogout(data.expiresIn));
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT
  };
};

export const autoLogout = time => async dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, time * 1000);
};

export const authSuccess = token => ({
  type: AUTH_SUCCESS,
  payload: token
});

export const autoLogin = payload => async (dispatch, getState) => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
      dispatch(
        autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
      );
    }
  }
};
