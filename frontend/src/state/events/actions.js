import { events } from '../../common/api';
import { FETCH_EVENTS, GET_FETCH_EVENTS_DATA_SUCCESS, GET_FETCH_EVENTS_DATA_ERROR } from './types';

export const getAllEventsData = (queryString) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_EVENTS
    });

    try {
      const data = await events.getEvents(`${queryString}`);

      dispatch({
        type: GET_FETCH_EVENTS_DATA_SUCCESS,
        payload: data
      });
      return data;
    } catch (error) {
      dispatch({
        type: GET_FETCH_EVENTS_DATA_ERROR,
        payload: error.message
      });
    }
  };
};
