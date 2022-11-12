//import { clubs } from '../../common/api';
import axios from 'axios';
import { FETCH_CLUBS, GET_FETCH_CLUBS_DATA_SUCCESS, GET_FETCH_CLUBS_DATA_ERROR } from './types';

export const getAllClubsData = (queryString) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_CLUBS
    });

    try {
      const data = await axios.get(`clubs/${queryString}`);

      dispatch({
        type: GET_FETCH_CLUBS_DATA_SUCCESS,
        payload: data.data
      });
      return data.data;
    } catch (error) {
      dispatch({
        type: GET_FETCH_CLUBS_DATA_ERROR,
        payload: error.message
      });
    }
  };
};

export const getClubsDataByUser = (queryString) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_CLUBS
    });

    try {
      const data = await axios.get(`clubs/user/${queryString}`);

      dispatch({
        type: GET_FETCH_CLUBS_DATA_SUCCESS,
        payload: data.data
      });
      console.log(data.data, 'red');
      return data.data;
    } catch (error) {
      dispatch({
        type: GET_FETCH_CLUBS_DATA_ERROR,
        payload: error.message
      });
    }
  };
};
