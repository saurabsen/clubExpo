import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import {
  Home,
  Login,
  AdminDashboard,
  ClubRequests,
  ClubsJoined,
  ClubsManaged,
  DiscoverClubs,
  EventsRegistered
} from './views';
import SideBar from './components/Sidebar/SideBar';
import { Grid } from '@mui/material';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const { data } = useTypedSelector((state) => state.auth);

  const handleSearch = (searchResults) => {
    setSearchResults(searchResults);
  };

  useEffect(() => {
    if (data) {
      setUserIsLoggedIn(true);
    }
  }, [data]);

  return (
    <>
      <Router>
        <Header userIsLoggedIn={userIsLoggedIn} handleSearch={handleSearch} />
        {!userIsLoggedIn ? (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        ) : (
          <Grid container>
            <Grid item xs={2}>
              <SideBar user={data} />
            </Grid>
            <Grid item xs={10}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/club-requests" element={<ClubRequests />} />
                <Route path="/clubs-joined" element={<ClubsJoined />} />
                <Route path="/clubs-managed" element={<ClubsManaged />} />
                <Route path="/discover-clubs" element={<DiscoverClubs />} />
                <Route path="/events-registered" element={<EventsRegistered />} />
              </Routes>
            </Grid>
          </Grid>
        )}
      </Router>
    </>
  );
};

export default App;
