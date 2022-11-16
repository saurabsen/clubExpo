import axios from 'axios';
import {
  SEND_NOTIFICATION,
  SEND_NOTIFICATION_SUCCESS,
  SEND_NOTIFICATION_ERROR,
  GET_NOTIFICATIONS,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_ERROR
} from './types';

export const sendNotification = (notification) => {
  debugger
  return async (dispatch) => {
    dispatch({
      type: SEND_NOTIFICATION
    });

    try {
      const token = JSON.parse(localStorage.getItem('userToken'));

      console.log(notification);

      const sent = await axios.post(`notifications/`, notification, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (sent) {
        const notifications = await axios.get(`notifications/`);

        dispatch({
          type: SEND_NOTIFICATION_SUCCESS,
          payload: notifications.data
        });

        return notifications;
      }
    } catch (error) {
      dispatch({
        type: SEND_NOTIFICATION_ERROR,
        payload: error.message
      });
    }
  };
};

export const getNotifications = (userID) => {
  return async (dispatch) => {
    dispatch({
      type: GET_NOTIFICATIONS
    });

    try {
      const token = JSON.parse(localStorage.getItem('userToken'));
      const user = JSON.parse(localStorage.getItem('user'));

      const notifications = await axios.get(
        `notifications/`,
        { id: userID },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const myNotifications = notifications.data.filter(
        (notification) => notification.to === user._id
      );

      dispatch({
        type: GET_NOTIFICATION_SUCCESS,
        payload: myNotifications
      });

      return notifications;
    } catch (error) {
      dispatch({
        type: GET_NOTIFICATION_ERROR,
        payload: error.message
      });
    }
  };
};

export const updateNotificationByID = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_NOTIFICATIONS
    });

    try {
      const token = JSON.parse(localStorage.getItem('userToken'));
      const user = JSON.parse(localStorage.getItem('user'));

      const notification = await axios.post(`notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const notifications = await axios.get(
        `notifications/`,
        { id: user._id },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const myNotifications = notifications.data.filter(
        (notification) => notification.to === user._id
      );

      dispatch({
        type: GET_NOTIFICATION_SUCCESS,
        payload: myNotifications
      });

      return notifications;
    } catch (error) {
      dispatch({
        type: GET_NOTIFICATION_ERROR,
        payload: error.message
      });
    }
  };
};

export const markAllNotificationAsRead = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_NOTIFICATIONS
    });

    try {
      const token = JSON.parse(localStorage.getItem('userToken'));
      const user = JSON.parse(localStorage.getItem('user'));

      const notification = await axios.post(`notifications/allNotifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const notifications = await axios.get(
        `notifications/`,
        { id: user._id },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const myNotifications = notifications.data.filter(
        (notification) => notification.to === user._id
      );

      dispatch({
        type: GET_NOTIFICATION_SUCCESS,
        payload: myNotifications
      });

      return notifications;
    } catch (error) {
      dispatch({
        type: GET_NOTIFICATION_ERROR,
        payload: error.message
      });
    }
  };
};
