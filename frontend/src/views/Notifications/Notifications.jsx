import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Box, List, ListItem, Divider, ListItemText } from '@mui/material';

const Notifications = () => {
  const { updateNotificationByID, markAllNotificationAsRead } = useActions();
  const { notifications } = useTypedSelector((state) => state.notifications);
  const navigate = useNavigate();

  const markAllAsRead = () => {
    markAllNotificationAsRead();
  };

  const openNotification = (notification) => {
    // make this notification as read
    updateNotificationByID(notification._id);
    // navigate
    if (notification.type === 'newProposal') {
      navigate('/club-requests');
    } else if (notification.type === 'newClub') {
      navigate('/profile');
    } else if (notification.type === 'newEvent') {
      navigate('/events-registered');
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3>Notifications</h3>
        <p style={{ cursor: 'pointer' }} onClick={markAllAsRead}>
          Mark all as read
        </p>
      </div>
      <List sx={{ width: '100%', bgcolor: 'background.paper', padding: '1rem 0' }}>
        {notifications && typeof notifications === 'object' && notifications.length > 0
          ? notifications.map((notification) => {
              return (
                <div key={notification._id}>
                  <ListItem
                    button
                    sx={{ color: notification.read ? 'grey' : 'black', padding: '1rem 0' }}
                    onClick={() => openNotification(notification)}
                  >
                    <ListItemText primary={notification.message} />
                  </ListItem>
                  <Divider />
                </div>
              );
            })
          : null}
      </List>
    </Box>
  );
};

export default Notifications;
