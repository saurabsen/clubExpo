import { useState } from 'react';
import { Avatar, Menu, MenuItem, Button } from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';
import { LogoRectangle, NotificationsOff, NotificationsOn } from '../../assets';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './header.css';

const Header = ({ handleSearch }) => {
  const [newNotification, setNewNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(null);

  const handleShowProfileModal = (e) => {
    setShowProfileModal(e.currentTarget);
  };

  const handleCloseProfileModal = (e) => {
    setShowProfileModal(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ p:3}}>
        <Grid item xs={2}>
          <img src={LogoRectangle} width="130" alt="Clubspace Logo" />
        </Grid>
        <Grid item xs={8} >
        <SearchBar handleSearch={handleSearch} />
        </Grid>
        <Grid item xs={2}>
        <img src={NotificationsOn} alt="Notification Bell On" />
        <img src={NotificationsOff} alt="Notification Bell Off" />
        <Avatar
        id="profile-icon"
        alt="User profile image"
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
        onClick={handleShowProfileModal}
      />
        </Grid>
      </Grid>
    </Box>

  );
};

export default Header;
