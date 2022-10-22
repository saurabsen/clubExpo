import { useState } from 'react';
import { Avatar, Menu, MenuItem, Button } from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';
import { LogoRectangle, NotificationsOff, NotificationsOn } from '../../assets';
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
    <div className="header">
      <div className="logo">
        <img src={LogoRectangle} width="130" alt="Clubspace Logo" />
      </div>

      <div className="search">
        <SearchBar handleSearch={handleSearch} />
      </div>

      <div className="notification-and-profile">
        <div className="notification">
          <div>
            {newNotification ? (
              <img src={NotificationsOn} alt="Notification Bell On" />
            ) : (
              <img src={NotificationsOff} alt="Notification Bell Off" />
            )}
          </div>
        </div>

        <div className="profile">
          <div>
            <Avatar
              id="profile-icon"
              alt="User profile image"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
              onClick={handleShowProfileModal}
            />
          </div>
          <div>
            <Menu
              anchorEl={showProfileModal}
              open={Boolean(showProfileModal)}
              onClose={handleCloseProfileModal}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Club Proposal</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
