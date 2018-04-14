import axios from "axios/index";

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const API_URL = 'http://localhost:8080/api';

// export function actionName() {
//
//   return {
//     type: ACTION_TYPE,
//     payload: data
//   };
// }

exports.logInUser = (user, endpoint) => {
  return (dispatch) => {
    axios.post(`${API_URL}/${endpoint}`, user)
      .then(res => {
        dispatch({ type: AUTH_USER });

        const auth = JSON.parse(res.headers.auth);
        localStorage.setItem('token', auth.token);
      })
      .catch(() => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Invalid username or password'
        });
      });
  };
};

exports.logOutUser = () => {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}