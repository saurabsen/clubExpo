//import { events } from '../../common/api';
import axios from 'axios';
import { FETCH_EVENTS, GET_FETCH_EVENTS_DATA_SUCCESS, GET_FETCH_EVENTS_DATA_ERROR } from './types';

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
