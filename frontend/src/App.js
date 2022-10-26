import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import ClubProposal from './views/ClubProposal/ClubProposal';
import { Home, ClubsJoined, DiscoverClubs } from './views';
import SideBar from './components/Sidebar/SideBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchResults) => {
    setSearchResults(searchResults);
  };

  return (
    <>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={12}>
              <Header handleSearch={handleSearch} />
            </Grid>
            <Grid item xs={2}>
              <SideBar userRole="member" />
            </Grid>
            <Grid item xs={10}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/proposal" element={<ClubProposal />} />
                <Route path="/clubs-joined" element={<ClubsJoined />} />
                <Route path="/discover-clubs" element={<DiscoverClubs />} />
              </Routes>
            </Grid>
          </Grid>
        </Box>
      </Router>
    </>
  );
};

export default App;
