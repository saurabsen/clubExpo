import React from 'react';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import './searchresult.css';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import EventsCard from '../../components/EventsCard/EventsCard';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ClubCard from '../../components/ClubCard/ClubCard';
import { useActions } from '../../hooks/useActions';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const SearchResults = () => {
  const [value, setValue] = useState(0);
  const [searchEvents, setSearchevents] = useState([]);
  const [searchClubs, setSearchclubs] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const { clubs: clubsData } = useTypedSelector((state) => state.search);
  const { events: eventsData } = useTypedSelector((state) => state.search);
  const { searchBy } = useTypedSelector((state) => state.search);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setSearchValue(searchBy);
    console.log(searchBy);
  }, [searchBy]);

  useEffect(() => {
    setSearchclubs([...clubsData]);
    console.log(clubsData, 'clubdata');
  }, [clubsData]);

  useEffect(() => {
    setSearchevents([...eventsData]);
    console.log(clubsData, 'eventdata');
  }, [eventsData]);

  return (
    <>
      <Grid className="search-container" container spacing={2}>
        <Grid item xs={12}>
          <h1>Search Results: {searchBy}</h1>
        </Grid>
        <Box sx={{ width: '1400px', padding: '2rem 0' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
              <Tab label="Events" {...a11yProps(0)} />
              <Tab label="Clubs" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {eventsData.length === 0
              ? 'No Events'
              : eventsData.map((event) => {
                  return <div>{event._id}</div>;
                })}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ p: 2 }}>
                {clubsData.length === 0
                  ? 'No Clubs'
                  : clubsData.map((club) => {
                      return (
                        <Grid item xs={4}>
                          <ClubCard
                            clubImage={club.logoImage}
                            clubName={club.name}
                            clubNumMembers="2"
                            clubId={club._id}
                          />
                        </Grid>
                      );
                    })}
              </Grid>
            </Box>
          </TabPanel>
        </Box>
      </Grid>
    </>
  );
};

export default SearchResults;
