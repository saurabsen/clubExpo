import { FETCH_CLUBS, GET_FETCH_CLUBS_DATA_SUCCESS, GET_FETCH_CLUBS_DATA_ERROR } from './types';

const initialState = {
  loading: false,
  error: null,
  data: []
};

const clubsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLUBS:
      return { loading: true, error: null, data: [] };
    case GET_FETCH_CLUBS_DATA_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case GET_FETCH_CLUBS_DATA_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default clubsReducer;
