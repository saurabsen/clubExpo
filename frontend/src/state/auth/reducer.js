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

const initialState = {
  loading: false,
  error: null,
  data: []
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

    case ADD_EVENT_TO_USER_MODEL:
      return { loading: true, error: null, data: null };
    case ADD_EVENT_TO_USER_MODEL_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ADD_EVENT_TO_USER_MODEL_ERROR:
      return { loading: false, error: action.payload, data: state.data };

    case REMOVE_EVENT_FROM_USER_MODEL:
      return { loading: true, error: null, data: null };
    case REMOVE_EVENT_FROM_USER_MODEL_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case REMOVE_EVENT_FROM_USER_MODEL_ERROR:
      return { loading: false, error: action.payload, data: state.data };

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
