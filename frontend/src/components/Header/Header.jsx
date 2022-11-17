import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Avatar, Menu, MenuItem } from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';
import { LogoRectangle, NotificationsOff, NotificationsOn } from '../../assets';
import './header.css';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Header = ({ userIsLoggedIn, handleSearch, handleLogoutUser }) => {
  const [newNotification, setNewNotification] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(null);

  const { getNotifications } = useActions();
  const { data } = useTypedSelector((state) => state.auth);
  const { notifications } = useTypedSelector((state) => state.notifications);

  const handleShowProfileModal = (e) => {
    setShowProfileModal(e.currentTarget);
  };

  const handleCloseProfileModal = (e) => {
    setShowProfileModal(null);
  };

  const handleLogout = () => {
    setShowProfileModal(null);
    handleLogoutUser();
  };

  // useEffect(() => {
  //   if (data) {
  //     getNotifications(data._id);
  //   }
  // }, []);

  useEffect(() => {
    setNewNotification(false);

    if (data) {
      getNotifications(data._id);
    }

    if (typeof notifications === 'object') {
      notifications.map((notification) => {
        if (!notification.read) {
          setNewNotification(true);
          return;
        }
      });
    }
  }, [notifications]);
  return (
    <>
      {!userIsLoggedIn ? (
        <Box
          sx={{
            padding: '1rem 4rem',
            width: '100%',
            border: '1px solid #e0e2e0',
            position: 'sticky',
            top: 0,
            zIndex: 999,
            backgroundColor: '#fff'
          }}
        >
          <img src={LogoRectangle} style={{ width: '130px' }} alt="Clubspace Logo" />
        </Box>
      ) : (
        <Box
          sx={{
            padding: '1rem 4rem',
            width: '100%',
            border: '1px solid #e0e2e0',
            position: 'sticky',
            top: 0,
            zIndex: 999,
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '6rem'
          }}
        >
          <img src={LogoRectangle} style={{ width: '130px' }} alt="Clubspace Logo" />
          <SearchBar handleSearch={handleSearch} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4rem'
            }}
          >
            <Box>
              {!newNotification ? (
                <Link to="/notifications">
                  <img
                    src={NotificationsOff}
                    style={{ width: '24px' }}
                    alt="Notification Bell Off"
                  />
                </Link>
              ) : (
                <Link to="/notifications">
                  <img src={NotificationsOn} style={{ width: '24px' }} alt="Notification Bell On" />
                </Link>
              )}
            </Box>
            <Box>
              <Avatar
                id="profile-icon"
                alt="User profile image"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                sx={{ cursor: 'pointer' }}
                onClick={handleShowProfileModal}
              ></Avatar>
              <Menu
                anchorEl={showProfileModal}
                open={Boolean(showProfileModal)}
                onClose={handleCloseProfileModal}
              >
                <Link to="/profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link to="/submit-proposal">
                  <MenuItem>Club Proposal</MenuItem>
                </Link>
                <Link onClick={handleLogout}>
                  <MenuItem>Logout</MenuItem>
                </Link>
              </Menu>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Header;
