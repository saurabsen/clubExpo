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

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  loading: false,
  error: null,
  data: user ? user : null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { loading: true, error: null, data: null };
    case GET_LOGIN_DATA_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case GET_LOGIN_DATA_ERROR:
      return { loading: false, error: action.payload, data: null };

    case FETCH_USER:
      return { loading: true, error: null, data: null };
    case GET_FETCH_USER_DATA_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case GET_FETCH_USER_DATA_ERROR:
      return { loading: false, error: action.payload, data: null };

    case LOGOUT_USER:
      return { loading: true, error: null, data: null };
    case GET_LOGOUT_DATA_SUCCESS:
      return { loading: false, error: null, data: null };
    case GET_LOGOUT_DATA_ERROR:
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
};

export default authReducer;
