/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import '@fontsource/raleway';
import { useState, useEffect } from 'react';
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
  Request
} from './assets';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import SearchResults from './views/SearchResults/SearchResults';
import axios from 'axios';

const App = () => {
  const pathname = window.location.pathname;
  const { getUser, logoutUser } = useActions();
  const { data: userData } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('userToken'));
  const [sideBarMenu, setSideBarMenu] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('userToken'));
    if (location.pathname !== '/login' && token) {
      getUser();
    }
  }, [location]);

  useEffect(() => {
    let menuItems = [];

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
        }
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
      <Header userIsLoggedIn={token} handleLogoutUser={handleLogoutUser} />
      {!token ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexFlow: 'row' }}>
            {pathname.includes('/proposal') ||
            pathname.includes('/submit-proposal') ||
            pathname.includes('/clubs/') ||
            pathname.includes('/profile') ||
            pathname.includes('/events/') ? (
              ''
            ) : (
              <Box sx={{ display: { xs: 'none', md: 'block' }, flex: '0 0 231px' }}>
                <SideBar sidebardata={sideBarMenu} />
              </Box>
            )}
            <Box sx={{ flexGrow: '1' }}>
              <Routes>
                <Route exact path="/" element={<Home />} />
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
        </Box>
      )}
    </ThemeProvider>
  );
};

export default App;
