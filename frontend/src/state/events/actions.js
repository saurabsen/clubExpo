//import { events } from '../../common/api';
import axios from 'axios';
import { FETCH_EVENTS, GET_FETCH_EVENTS_DATA_SUCCESS, GET_FETCH_EVENTS_DATA_ERROR, ADD_USER_TO_EVENT, ADD_USER_TO_EVENT_SUCCESS, ADD_USER_TO_EVENT_ERROR, REMOVE_USER_FROM_EVENT, REMOVE_USER_FROM_EVENT_SUCCESS, REMOVE_USER_FROM_EVENT_ERROR } from './types';

export const getAllEventsData = (queryString, params) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_EVENTS
    });

    try {
      const data = await axios.post(`events/${queryString}`, params);
      dispatch({
        type: GET_FETCH_EVENTS_DATA_SUCCESS,
        payload: [...data.data]
      });
      return data.data;
    } catch (error) {
      dispatch({
        type: GET_FETCH_EVENTS_DATA_ERROR,
        payload: error.message
      });
    }
  };
};

export const addUserToEventModel = (eventId, userId) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_USER_TO_EVENT
    });

    try {
      await axios.post(`events/${eventId}/attendedby/${userId}`);
      dispatch({
        type: ADD_USER_TO_EVENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADD_USER_TO_EVENT_ERROR,
        payload: error.message
      });
    }
  };
};

export const removeUserFromEventModel = (eventId, userId) => {
  return async (dispatch) => {
    dispatch({
      type: REMOVE_USER_FROM_EVENT
    });

    try {
      await axios.post(`events/${eventId}/unattendedby/${userId}`);
      dispatch({
        type: REMOVE_USER_FROM_EVENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_USER_FROM_EVENT_ERROR,
        payload: error.message
      });
    }
  };
};
