import '@fontsource/raleway';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Header } from './components';
import ClubProposal from './views/ClubProposal/ClubProposal';
import { Home, ClubsJoined, DiscoverClubs } from './views';
import SideBar from './components/Sidebar/SideBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProposalManagement from './views/ProposalManagement/ProposalManagement';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import { Header } from './components';
import { Home, ClubsJoined, DiscoverClubs, EventPage } from './views';
import SideBar from './components/Sidebar/SideBar';

const App = () => {
  const pathname = window.location.pathname;
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchResults) => {
    setSearchResults(searchResults);
  };

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
      fontFamily: ['Raleway', 'serif'].join(','),
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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={12}>
              <Header handleSearch={handleSearch} />
            </Grid>
            {pathname === '/proposal' ? (
              ''
            ) : (
              <Grid item xs={2}>
                <SideBar userRole="member" />
              </Grid>
            )}
            <Grid item xs={pathname === '/proposal' ? 12 : 10}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/proposal" element={<ClubProposal />} />
                <Route path="/all-proposal" element={<ProposalManagement />} />
                <Route path="/clubs-joined" element={<ClubsJoined />} />
                <Route path="/discover-clubs" element={<DiscoverClubs />} />
                <Route path="/events/:eventId" element={<UserEventsPage />} />
              </Routes>
            </Grid>
          </Grid>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
