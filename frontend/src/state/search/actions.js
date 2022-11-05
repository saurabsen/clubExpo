import axios from 'axios';
import {
  FETCH_SEARCH_BY_CLUBS,
  FETCH_SEARCH_BY_CLUBS_DATA_SUCCESS,
  FETCH_SEARCH_BY_CLUBS__DATA_ERROR,
  FETCH_SEARCH_BY_EVENTS,
  FETCH_SEARCH_BY_EVENTS_DATA_SUCCESS,
  FETCH_SEARCH_BY_EVENTS__DATA_ERROR
} from './types';

export const getSearchByClubs = (statusValue) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_SEARCH_BY_CLUBS
    });

    try {
      const token = JSON.parse(localStorage.getItem('userToken'));

      const data = await axios.get(`http://localhost:3001/api/search/clubs/${statusValue}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch({
        type: FETCH_SEARCH_BY_CLUBS_DATA_SUCCESS,
        payload: data.data,
        searchBy: statusValue
      });
      return data.data;
    } catch (error) {
      dispatch({
        type: FETCH_SEARCH_BY_CLUBS__DATA_ERROR,
        payload: error.message,
        searchBy: statusValue
      });
    }
  };
};

export const getSearchByEvents = (statusValue) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_SEARCH_BY_EVENTS
    });

    try {
      const token = JSON.parse(localStorage.getItem('userToken'));

      const data = await axios.get(`http://localhost:3001/api/search/events/${statusValue}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch({
        type: FETCH_SEARCH_BY_EVENTS_DATA_SUCCESS,
        payload: data.data,
        searchBy: statusValue
      });
      return data.data;
    } catch (error) {
      dispatch({
        type: FETCH_SEARCH_BY_EVENTS__DATA_ERROR,
        payload: error.message,
        searchBy: statusValue
      });
    }
  };
};
