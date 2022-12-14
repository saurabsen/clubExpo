/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Avatar, Menu, MenuItem } from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';
import { NotificationsOff, NotificationsOn, Search } from '../../assets';
import './header.css';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { purple } from '@mui/material/colors';

const Header = ({ userIsLoggedIn, handleSearch, handleLogoutUser }) => {
  const [newNotification, setNewNotification] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(null);

  const { getNotifications } = useActions();
  const { data } = useTypedSelector((state) => state.auth);
  const { notifications } = useTypedSelector((state) => state.notifications);
  const userData = JSON.parse(localStorage.getItem('user'));

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

  useEffect(() => {
    setNewNotification(false);

    if (data) {
      getNotifications(data._id);
    }

    if (typeof notifications === 'object') {
      // eslint-disable-next-line array-callback-return
      notifications.map((notification) => {
        if (!notification.read) {
          setNewNotification(true);
          // eslint-disable-next-line array-callback-return
          return;
        }
      });
    }
  }, []);
  // }, [notifications]);

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: purple[500],
        width: 100,
        height: 100
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
  };

  return (
    <>
      {!userIsLoggedIn ? (
        <Box
          sx={{
            width: '100%',
            border: '1px solid #e0e2e0',
            position: 'sticky',
            top: 0,
            zIndex: 999,
            backgroundColor: '#fff'
          }}
        >
          {/* <img src={LogoRectangle} style={{ width: '130px' }} alt="Clubspace Logo" /> */}
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
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '6rem'
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '6rem'
            }}
          >
            {/* <Link to="/home">
              <img src={LogoRectangle} style={{ width: '130px' }} alt="Clubspace Logo" />
            </Link> */}
            <Box className="desktopSearchbar" sx={{ width: '100%' }}>
              <SearchBar handleSearch={handleSearch} />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem'
            }}
          >
            <Box className="mobileSearchIcon">
              <Link>
                <img src={Search} style={{ width: '26px' }} alt="Search Icon" />
              </Link>
            </Box>
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
                {...stringAvatar(`${userData.firstName} ${userData.lastName}`)}
                id="profile-icon"
                alt="User profile image"
                src={userData.profileImage}
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
