import { FETCH_EVENTS, GET_FETCH_EVENTS_DATA_SUCCESS, GET_FETCH_EVENTS_DATA_ERROR, ADD_USER_TO_EVENT, ADD_USER_TO_EVENT_SUCCESS, ADD_USER_TO_EVENT_ERROR, REMOVE_USER_FROM_EVENT, REMOVE_USER_FROM_EVENT_SUCCESS, REMOVE_USER_FROM_EVENT_ERROR } from './types';

const initialState = {
  loading: false,
  error: null,
  data: []
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return { loading: true, error: null, data: [] };
    case GET_FETCH_EVENTS_DATA_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case GET_FETCH_EVENTS_DATA_ERROR:
      return { loading: false, error: action.payload, data: [] };
    case ADD_USER_TO_EVENT:
      return { loading: true, error: null, data: state.data};
    case ADD_USER_TO_EVENT_SUCCESS:
      return { loading: false, error: null, data: state.data};
    case ADD_USER_TO_EVENT_ERROR:
      return { loading: false, error: action.payload, data: state.data};
    case REMOVE_USER_FROM_EVENT:
      return { loading: true, error: null, data: state.data};
    case REMOVE_USER_FROM_EVENT_SUCCESS:
      return { loading: false, error: null, data: state.data};
    case REMOVE_USER_FROM_EVENT_ERROR:
      return { loading: false, error: action.payload, data: state.data};
    
    default:
      return state;
  }
};

export default eventReducer;
