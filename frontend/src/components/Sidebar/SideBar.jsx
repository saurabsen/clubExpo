import {
  HomeIcon,
  Discover,
  ClubsJoined,
  EventRegistered,
  ClubsManaged,
  Dashboard,
  Request
} from '../../assets';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const SideBar = ({ user }) => {
  const { userRole } = user;

  return (
    <Box className="sidebar">
      <ul>
        {userRole === 'clubAdmin' || userRole === 'member' ? (
          <>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-menu' : '')}>
              <li>
                <img src={HomeIcon} alt="Home Icon" /> Home
              </li>
            </NavLink>
            <NavLink
              to="/discover-clubs"
              className={({ isActive }) => (isActive ? 'active-menu' : '')}
            >
              <li>
                <img src={Discover} alt="Discover Clubs Icon" /> Discover Clubs
              </li>
            </NavLink>
            <NavLink
              to="/clubs-joined"
              className={({ isActive }) => (isActive ? 'active-menu' : '')}
            >
              <li>
                <img src={ClubsJoined} alt="Clubs Joined Icon" /> Clubs Joined
              </li>
            </NavLink>
          </>
        ) : null}

        {userRole === 'hubAdmin' ? (
          <>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) => (isActive ? 'active-menu' : '')}
            >
              <li>
                <img src={Dashboard} alt="Dashboard Icon" /> Dashboard
              </li>
            </NavLink>
            <NavLink
              to="/clubs-managed"
              className={({ isActive }) => (isActive ? 'active-menu' : '')}
            >
              <li>
                <img src={ClubsManaged} alt="All Clubs Icon" /> All Clubs
              </li>
            </NavLink>
            <NavLink
              to="/club-requests"
              className={({ isActive }) => (isActive ? 'active-menu' : '')}
            >
              <li>
                <img src={Request} alt="Club Requests Icon" /> Club Requests
              </li>
            </NavLink>
          </>
        ) : null}

        {userRole === 'member' ? (
          <NavLink
            to="/events-registered"
            className={({ isActive }) => (isActive ? 'active-menu' : '')}
          >
            <li>
              <img src={EventRegistered} alt="Events Registered Icon" /> Events Registered
            </li>
          </NavLink>
        ) : null}
      </ul>
    </Box>
  );
};

export default SideBar;
