//import { clubs } from '../../common/api';
import axios from 'axios';
import {
  FETCH_CLUB_MEMBERS,
  GET_FETCH_CLUB_MEMBER_DATA_SUCCESS,
  GET_FETCH_CLUB_MEMBER_DATA_ERROR
} from './types';

export const getClubMembersData = (queryString, params) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_CLUB_MEMBERS
    });

    try {
      const data = await axios.post(`clubmembers/${queryString}`, params);

      dispatch({
        type: GET_FETCH_CLUB_MEMBER_DATA_SUCCESS,
        payload: data.data
      });
      return data.data;
    } catch (error) {
      dispatch({
        type: GET_FETCH_CLUB_MEMBER_DATA_ERROR,
        payload: error.message
      });
    }
  };
};
