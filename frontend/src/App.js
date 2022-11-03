// import '@fontsource/raleway';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
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
  EventsRegistered
} from './views';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';

const App = () => {
  const pathname = window.location.pathname;
  const [searchResults, setSearchResults] = useState([]);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const { logoutUser } = useActions();
  const { data } = useTypedSelector((state) => state.auth);

  const handleSearch = (searchResults) => {
    setSearchResults(searchResults);
  };

  useEffect(() => {
    if (data) {
      setUserIsLoggedIn(true);

      if (data.userRole === 'member' || data.userRole === 'clubAdmin') {
        navigate('/home');
      } else if (data.userRole === 'hubAdmin') {
        navigate('/admin-dashboard');
      }
    } else {
      setUserIsLoggedIn(false);
      navigate('/login');
    }
  }, [data]);

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

  const handleLogoutUser = () => logoutUser();

  return (
    <ThemeProvider theme={theme}>
      <Header
        userIsLoggedIn={userIsLoggedIn}
        handleSearch={handleSearch}
        handleLogoutUser={handleLogoutUser}
      />
      {!userIsLoggedIn ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            {pathname === '/proposal' ? (
              ''
            ) : (
              <Grid item xs={2}>
                <SideBar />
              </Grid>
            )}
            <Grid item xs={pathname === '/proposal' ? 12 : 10}>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/proposal" element={<ClubProposal />} />
                <Route path="/all-proposal" element={<ProposalManagement />} />
                <Route path="/club-requests" element={<ClubRequests />} />
                <Route path="/clubs-joined" element={<ClubsJoined />} />
                <Route path="/clubs-managed" element={<ClubsManaged />} />
                <Route path="/discover-clubs" element={<DiscoverClubs />} />
                <Route path="/events-registered" element={<EventsRegistered />} />
                <Route path="/events/:eventId" element={<UserEventsPage />} />
              </Routes>
            </Grid>
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default App;
