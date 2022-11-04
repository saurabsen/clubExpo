// import '@fontsource/raleway';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
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
  ClubPage
} from './views';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';

const App = () => {
  const pathname = window.location.pathname;
  const [searchResults, setSearchResults] = useState([]);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const noSidebar = ['/proposal', '/clubs'];

  const { data } = useTypedSelector((state) => state.auth);

  const handleSearch = (searchResults) => {
    setSearchResults(searchResults);
  };

  useEffect(() => {
    if (data) {
      setUserIsLoggedIn(true);
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

  const ClubSinglePage = () => {
    let { clubId } = useParams();
    return <ClubPage clubId={clubId} />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header userIsLoggedIn={userIsLoggedIn} handleSearch={handleSearch} />
        {!userIsLoggedIn ? (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {
                pathname === '/proposal' ? '' : ''
                /* <Grid item xs={2}>
                  <SideBar user={data} />
                </Grid> */
              }
              <Grid item xs={12}>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/proposal" element={<ClubProposal />} />
                  <Route path="/all-proposal" element={<ProposalManagement />} />
                  <Route path="/club-requests" element={<ClubRequests />} />
                  <Route path="/clubs-joined" element={<ClubsJoined />} />
                  <Route path="/clubs-managed" element={<ClubsManaged />} />
                  <Route path="/clubs/:id" element={<ClubDetail />} />
                  <Route path="/discover-clubs" element={<DiscoverClubs />} />
                  <Route path="/events-registered" element={<EventsRegistered />} />
                  <Route path="/events/:eventId" element={<UserEventsPage />} />
                  <Route path="/clubs/:clubId" element={<ClubSinglePage />} />
                </Routes>
              </Grid>
            </Grid>
          </Box>
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
