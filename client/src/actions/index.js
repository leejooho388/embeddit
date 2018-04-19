import axios from "axios";
import jwt from 'jsonwebtoken';

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

exports.checkJWT = () => {
  return (dispatch) => {
    if (localStorage['token']) {
      jwt.verify(localStorage['token'], 'your_jwt_secret', (err, decoded) => {
        // we can verify user exists in db if we want to but right now we're just checking
        // that the object contains a property '_id'
        if (decoded.user.hasOwnProperty('_id')) {
          dispatch({ type: AUTH_USER, payload: decoded.user });
        }
      });
    }
  }
};

exports.logInUser = (user, endpoint) => {
  return (dispatch) => {
    axios.post(`${API_URL}/${endpoint}`, user)
      .then(res => {
        const auth = JSON.parse(res.headers.auth);
        localStorage.setItem('token', auth.token);

        jwt.verify(auth.token, 'your_jwt_secret', (err, decoded) => {
          dispatch({ type: AUTH_USER, payload: decoded.user });
        });
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

exports.updateSubscription = (subInfo, currentUser) => {
  let updatedUser = Object.assign({}, currentUser);
  return (dispatch) => {
    axios.post(`${API_URL}/subscribe`, subInfo)
      .then(res => {
        if (subInfo.change === 1) {
          updatedUser.subredditIds.push(subInfo.subredditName);
        } else {
          let index = updatedUser.subredditIds.indexOf(subInfo.subredditName);
          updatedUser.subredditIds.splice(index, 1);
        }
        const auth = JSON.parse(res.headers.auth);
        localStorage.setItem('token', auth.token);

        jwt.verify(auth.token, 'your_jwt_secret', (err, decoded) => {
          dispatch({ type: AUTH_USER, payload: decoded.user });
        });
      })
      .catch(() => {
      });
  };
};
