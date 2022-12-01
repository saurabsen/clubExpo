/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import '@fontsource/raleway';
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Header, SideBar } from './components';
import {
  Home,
  Login,
  AdminDashboard,
  ClubRequests,
  ClubsJoined,
  ClubsManaged,
  DiscoverClubs,
  EventPage,
  ClubProposal,
  ProposalManagement,
  EventsRegistered,
  ClubDetail,
  Proposal,
  Profile,
  ClubPage,
  CreateEvent,
  NotFoundPage,
  Notifications
} from './views';
import {
  HomeIcon,
  Discover,
  ClubsJoined as ClubsJoinedIcon,
  EventRegistered,
  ClubsManaged as ClubsManagedIcon,
  Dashboard,
  Request,
  Members
} from './assets';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import SearchResults from './views/SearchResults/SearchResults';
import axios from 'axios';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Landing from './views/Landing/Landing';

const App = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(240);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  // const pathname = window.location.pathname;
  const { getUser, logoutUser } = useActions();
  const { data: userData } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('userToken'));
  const [sideBarMenu, setSideBarMenu] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('userToken'));
    if (location.pathname !== '/' && token) {
      getUser();
    }
  }, [location]);

  useEffect(() => {
    if (
      location.pathname === '/proposal' ||
      location.pathname === '/submit-proposal' ||
      location.pathname === '/clubs/' ||
      location.pathname === '/profile' ||
      location.pathname === '/events/' ||
      location.pathname.includes('/clubs/') ||
      location.pathname.includes('/events/')
    ) {
      setDrawerWidth(0);
    } else {
      setDrawerWidth(240);
    }
  }, [location.pathname]);

  useEffect(() => {
    let menuItems = [];

    if (sideBarMenu.length === 0) {
      if (
        userData != null &&
        userData.userRole !== undefined &&
        userData.userRole.includes('hubAdmin')
      ) {
        menuItems.push(
          {
            routeLink: '/admin-dashboard',
            icon: Dashboard,
            altText: 'Dashboard Icon',
            name: 'Dashboard'
          },
          {
            routeLink: '/org-settings',
            icon: Members,
            altText: 'Dashboard Icon',
            name: 'Org Settings'
          },
          // {
          //   routeLink: '/club-requests',
          //   icon: Request,
          //   altText: 'Club Requests Icon',
          //   name: 'Club Requests'
          // }
        );
      }

      if (
        userData != null &&
        userData.userRole !== undefined &&
        (userData.userRole.includes('clubAdmin') || userData.userRole.includes('member'))
      ) {
        menuItems.push(
          {
            routeLink: '/home',
            icon: HomeIcon,
            altText: 'Home Icon',
            name: 'Home'
          },
          {
            routeLink: '/discover-clubs',
            icon: Discover,
            altText: 'Discover Clubs Icon',
            name: 'Discover Clubs'
          },
          {
            routeLink: '/clubs-joined',
            icon: ClubsJoinedIcon,
            altText: 'Clubs Joined Icon',
            name: 'Clubs Joined'
          },
          {
            routeLink: '/events-registered',
            icon: EventRegistered,
            altText: 'Event Registered Icon',
            name: 'Events Registered'
          }
        );
      }

      if (
        userData != null &&
        userData.userRole !== undefined &&
        userData.userRole.includes('clubAdmin')
      ) {
        menuItems.push({
          routeLink: '/club-managed',
          icon: ClubsManagedIcon,
          altText: 'Clubs managed Icon',
          name: 'Clubs Managed'
        });
      }

      setSideBarMenu([...menuItems]);
    }
  }, [userData]);

  axios.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem('userToken'));
      //getUser();
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  const theme = createTheme({
    palette: {
      primary: {
        light: '#8658CE',
        main: '#5D1EBF',
        dark: '#8658CE',
        contrastText: '#fff'
      }
    },
    typography: {
      // fontFamily: ['Raleway', 'serif'].join(','),
      button: {
        textTransform: 'none',
        fontWeight: 500,
        fontFamily: 'Raleway',
        fontSize: '16px'
      },
      h4: {
        fontFamily: 'Oswald'
      },
      h5: {
        fontFamily: 'Oswald'
      }
    }
  });

  const UserEventsPage = () => {
    let { eventId } = useParams();
    return <EventPage eventId={eventId} />;
  };

  const ClubSinglePage = () => {
    let { clubId } = useParams();
    return <ClubPage clubId={clubId} />;
  };

  const CreateEventPage = () => {
    let { clubId } = useParams();
    return <CreateEvent clubId={clubId} />;
  };

  const handleLogoutUser = () => logoutUser();

  return (
    <ThemeProvider theme={theme}>
      {!token ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` }
            }}
          >
            <Toolbar sx={{ background: '#fff' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Header userIsLoggedIn={token} handleLogoutUser={handleLogoutUser} />
            </Toolbar>
          </AppBar>
          {location.pathname.includes('/proposal') ||
          location.pathname.includes('/submit-proposal') ||
          location.pathname.includes('/clubs/') ||
          location.pathname.includes('/profile') ||
          location.pathname.includes('/events/') ? (
            ''
          ) : (
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
              >
                <SideBar sidebardata={sideBarMenu} />
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
                open
              >
                <Divider />
                <SideBar sidebardata={sideBarMenu} />
              </Drawer>
            </Box>
          )}
          <Box
            component="main"
            sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Routes>
              {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
              <Route path="/admin-dashboard" element={<ClubRequests />} />
              <Route path="/club-requests" element={<ClubRequests />} />
              <Route path="/all-proposal" element={<ProposalManagement />} />
              <Route path="/proposals/:proposalId" element={<Proposal />} />
              <Route path="/home" element={<Home />} />
              <Route path="/discover-clubs" element={<DiscoverClubs />} />
              <Route path="/clubs-joined" element={<ClubsJoined />} />
              <Route path="/events-registered" element={<EventsRegistered />} />
              <Route path="/events/:eventId" element={<UserEventsPage />} />
              <Route path="/submit-proposal" element={<ClubProposal />} />
              <Route path="/clubs/:id" element={<ClubDetail />} />
              <Route path="/clubs/:clubId" element={<ClubSinglePage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/club-managed" element={<ClubsManaged />} />
              <Route path="/clubs/:clubId/createevent" element={<CreateEventPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </Box>
        </Box>
      )}
    </ThemeProvider>
    // <ThemeProvider theme={theme}>
    //   <Header userIsLoggedIn={token} handleLogoutUser={handleLogoutUser} />
    //   {!token ? (
    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //     </Routes>
    //   ) : (
    //     <Box sx={{ flexGrow: 1 }}>
    //       <Box sx={{ display: 'flex', flexFlow: 'row' }}>
    //         {pathname.includes('/proposal') ||
    //         pathname.includes('/submit-proposal') ||
    //         pathname.includes('/clubs/') ||
    //         pathname.includes('/profile') ||
    //         pathname.includes('/events/') ? (
    //           ''
    //         ) : (
    //           <Box sx={{ display: { xs: 'none', md: 'block' }, flex: '0 0 231px' }}>
    //             <SideBar sidebardata={sideBarMenu} />
    //           </Box>
    //         )}
    //         <Box sx={{ flexGrow: '1' }}>
    //           <Routes>
    //             <Route exact path="/" element={<Home />} />
    //             {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
    //             <Route path="/admin-dashboard" element={<ClubRequests />} />
    //             <Route path="/club-requests" element={<ClubRequests />} />
    //             <Route path="/all-proposal" element={<ProposalManagement />} />
    //             <Route path="/proposals/:proposalId" element={<Proposal />} />
    //             <Route path="/home" element={<Home />} />
    //             <Route path="/discover-clubs" element={<DiscoverClubs />} />
    //             <Route path="/clubs-joined" element={<ClubsJoined />} />
    //             <Route path="/events-registered" element={<EventsRegistered />} />
    //             <Route path="/events/:eventId" element={<UserEventsPage />} />
    //             <Route path="/submit-proposal" element={<ClubProposal />} />
    //             <Route path="/clubs/:id" element={<ClubDetail />} />
    //             <Route path="/clubs/:clubId" element={<ClubSinglePage />} />
    //             <Route path="/search" element={<SearchResults />} />
    //             <Route path="/404" element={<NotFoundPage />} />
    //             <Route path="/club-managed" element={<ClubsManaged />} />
    //             <Route path="/clubs/:clubId/createevent" element={<CreateEventPage />} />
    //             <Route path="/profile" element={<Profile />} />
    //             <Route path="/notifications" element={<Notifications />} />
    //           </Routes>
    //         </Box>
    //       </Box>
    //     </Box>
    //   )}
    // </ThemeProvider>
  );
};

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default App;
