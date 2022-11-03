import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Avatar, Menu, MenuItem, Button } from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';
import { LogoRectangle, NotificationsOff, NotificationsOn } from '../../assets';
import Grid from '@mui/material/Grid';
import './header.css';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Header = ({ userIsLoggedIn, handleSearch }) => {
  const [newNotification, setNewNotification] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(null);
  const { data } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();

  const { logoutUser } = useActions();

  const handleShowProfileModal = (e) => {
    setShowProfileModal(e.currentTarget);
  };

  const handleCloseProfileModal = (e) => {
    setShowProfileModal(null);
  };

  const logout = () => {
    logoutUser();
    navigate('/');
  };

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
          <Link to="/">
            <img src={LogoRectangle} style={{ width: '130px' }} alt="Clubspace Logo" />
          </Link>
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
          <Link to="/">
            <img src={LogoRectangle} style={{ width: '130px' }} alt="Clubspace Logo" />
          </Link>
          <SearchBar />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4rem'
            }}
          >
            <Box>
              {!newNotification ? (
                <Link to="/notification">
                  <img
                    src={NotificationsOff}
                    style={{ width: '24px' }}
                    alt="Notification Bell Off"
                  />
                </Link>
              ) : (
                <Link to="/notification">
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
              />
              <div>
                <Menu
                  anchorEl={showProfileModal}
                  open={Boolean(showProfileModal)}
                  onClose={handleCloseProfileModal}
                >
                  <Link to="/profile">
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <Link to="/proposal">
                    <MenuItem>Club Proposal</MenuItem>
                  </Link>
                  <Link onClick={logout}>
                    <MenuItem>Logout</MenuItem>
                  </Link>
                </Menu>
              </div>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Header;
