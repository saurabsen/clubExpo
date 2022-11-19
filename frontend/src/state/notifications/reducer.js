import {
  SEND_NOTIFICATION,
  SEND_NOTIFICATION_SUCCESS,
  SEND_NOTIFICATION_ERROR,
  GET_NOTIFICATIONS,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_ERROR
} from './types';

const initialState = {
  loading: false,
  error: null,
  notifications: []
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_NOTIFICATION:
      return { loading: true, error: null, notifications: state.notifications };
    case SEND_NOTIFICATION_SUCCESS:
      return { loading: false, error: null, notifications: action.payload };
    case SEND_NOTIFICATION_ERROR:
      return { loading: false, error: action.payload, notifications: state.notifications };

    case GET_NOTIFICATIONS:
      return { loading: true, error: null, notifications: state.notifications };
    case GET_NOTIFICATION_SUCCESS:
      return { loading: false, error: null, notifications: action.payload };
    case GET_NOTIFICATION_ERROR:
      return { loading: false, error: action.payload, notifications: state.notifications };
    default:
      return state;
  }
};

export default notificationsReducer;
