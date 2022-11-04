import axios from 'axios';
import {
  LOGIN_USER,
  GET_LOGIN_DATA_SUCCESS,
  GET_LOGIN_DATA_ERROR,
  FETCH_USER,
  GET_FETCH_USER_DATA_SUCCESS,
  GET_FETCH_USER_DATA_ERROR,
  LOGOUT_USER,
  GET_LOGOUT_DATA_SUCCESS,
  GET_LOGOUT_DATA_ERROR
} from './types';

export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_USER
    });

    try {
      const data = await axios.post(`http://localhost:3001/api/users/login`, credentials);

      // store JWT in localStorage
      localStorage.setItem('userToken', JSON.stringify(data.data.token));

      // store user data object in localStorage
      const user = await axios.get(`http://localhost:3001/api/users/me`, {
        headers: { Authorization: `Bearer ${data.data.token}` }
      });

      if (user) {
        localStorage.setItem('user', JSON.stringify(user.data));
      }

      dispatch({
        type: GET_LOGIN_DATA_SUCCESS,
        payload: user.data
      });
      return data;
    } catch (error) {
      dispatch({
        type: GET_LOGIN_DATA_ERROR,
        payload: error.message
      });
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_USER
    });

    try {
      const token = JSON.parse(localStorage.getItem('userToken'));

      const data = await axios.get(`http://localhost:3001/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch({
        type: GET_FETCH_USER_DATA_SUCCESS,
        payload: data.data
      });
      return data;
    } catch (error) {
      dispatch({
        type: GET_FETCH_USER_DATA_ERROR,
        payload: error.message
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT_USER
    });

    try {
      // remove JWT in localStorage
      localStorage.removeItem('userToken');

      // remove user data object in localStorage
      localStorage.removeItem('user');

      const data = { message: 'User logged out successfully' };

      dispatch({
        type: GET_LOGOUT_DATA_SUCCESS,
        payload: null
      });
      return data;
    } catch (error) {
      dispatch({
        type: GET_LOGOUT_DATA_ERROR,
        payload: error.message
      });
    }
  };
};
