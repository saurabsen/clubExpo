// import '@fontsource/raleway';
import { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
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
  CreateEvent
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
  const { logoutUser } = useActions();
  const { data: userData } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('userToken'));
  const [sideBarMenu, setSideBarMenu] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    let menuItems = [];

    if (userData != null && userData.userRole.includes('hubAdmin')) {
      menuItems.push(
        {
          routeLink: '/admin-dashboard',
          icon: Dashboard,
          altText: 'Dashboard Icon',
          name: 'Dashboard'
        },
        {
          routeLink: '/club-requests',
          icon: Request,
          altText: 'Club Requests Icon',
          name: 'Club Requests'
        }
      );
    }

    if (
      userData != null &&
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
          routeLink: '/club-managed',
          icon: ClubsManagedIcon,
          altText: 'Clubs managed Icon',
          name: 'Clubs Managed'
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

    setSideBarMenu([...menuItems]);
  }, [userData]);

  axios.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem('userToken'));
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
        fontFamily: 'Raleway'
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
          <Grid container>
            {pathname.includes('/proposal') ||
            pathname.includes('/clubs') ||
            pathname.includes('/events/') ? (
              ''
            ) : (
              <Grid item xs={2}>
                <SideBar sidebardata={sideBarMenu} />
              </Grid>
            )}
            <Grid
              item
              xs={
                pathname.includes('/proposal') ||
                pathname.includes('/clubs') ||
                pathname.includes('/events/')
                  ? 12
                  : 10
              }
            >
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/submit-proposal" element={<ClubProposal />} />
                <Route path="/all-proposal" element={<ProposalManagement />} />
                <Route path="/club-requests" element={<ClubRequests />} />
                <Route path="/clubs-joined" element={<ClubsJoined />} />
                <Route path="/club-managed" element={<ClubsManaged />} />
                <Route path="/discover-clubs" element={<DiscoverClubs />} />
                <Route path="/events-registered" element={<EventsRegistered />} />
                <Route path="/events/:eventId" element={<UserEventsPage />} />
                <Route path="/proposals/:proposalId" element={<Proposal />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/clubs/:id" element={<ClubDetail />} />
                <Route path="/clubs/:clubId" element={<ClubSinglePage />} />
                <Route path="/clubs/:clubId/createevent" element={<CreateEventPage />} />
                <Route path="/search" element={<SearchResults />} />
              </Routes>
            </Grid>
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default App;
