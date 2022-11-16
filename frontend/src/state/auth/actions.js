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
  GET_LOGOUT_DATA_ERROR,
  ADD_EVENT_TO_USER_MODEL,
  ADD_EVENT_TO_USER_MODEL_SUCCESS,
  ADD_EVENT_TO_USER_MODEL_ERROR,
  REMOVE_EVENT_FROM_USER_MODEL,
  REMOVE_EVENT_FROM_USER_MODEL_SUCCESS,
  REMOVE_EVENT_FROM_USER_MODEL_ERROR,
} from './types';

export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_USER
    });

    try {
      const data = await axios.post(`users/login`, credentials);

      // store JWT in localStorage
      localStorage.setItem('userToken', JSON.stringify(data.data.token));
      axios.defaults.headers['Authorization'] = `Bearer ${data.data.token}`;
      // store user data object in localStorage
      const user = await axios.get(`users/me`);

      dispatch({
        type: GET_LOGIN_DATA_SUCCESS,
        payload: user.data
      });
      return user.data;
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
      const data = await axios.get(`users/me`);

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

export const addEventToUserModel = (userId, eventId) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_EVENT_TO_USER_MODEL
    });

    try {
      await axios.post(`users/${userId}/attend/${eventId}`);
      const data = await axios.get(`users/me`);
      
      dispatch({
        type: ADD_EVENT_TO_USER_MODEL_SUCCESS,
        payload: data.data
      });
      return data;
    } catch (error) {
      dispatch({
        type: ADD_EVENT_TO_USER_MODEL_ERROR,
        payload: error.message
      });
    }
  };
};

export const removeEventFromUserModel = (userId, eventId) => {
  return async (dispatch) => {
    dispatch({
      type: REMOVE_EVENT_FROM_USER_MODEL
    });

    try {
      await axios.post(`users/${userId}/unattend/${eventId}`);
      const data = await axios.get(`users/me`);
      
      dispatch({
        type: REMOVE_EVENT_FROM_USER_MODEL_SUCCESS,
        payload: data.data
      });
      return data;
    } catch (error) {
      dispatch({
        type: REMOVE_EVENT_FROM_USER_MODEL_ERROR,
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
