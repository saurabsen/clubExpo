import React from 'react';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import './searchresult.css';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import EventsCard from '../../components/EventsCard/EventsCard';
import { useState, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

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
  const { getSearchByClubs } = useActions();
  const pathname = window.location.pathname;
  console.log(pathname);
  const [value, setValue] = useState(0);
  const [events, setEvents] = useState([]);
  // const eventsData = useTypedSelector((state) => state.events);
  const { data: eventsData } = useTypedSelector((state) => state.search);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const initComponent = async (r) => {
    // const rawEvents = await getSearchByClubs(r);
    // console.log(rawEvents, 'raw data');
    // setEvents(rawEvents);
    getSearchByClubs(r).then((res) => {
      console.log(res, 'res');
      setEvents([...res]);
      console.log(setEvents, 'events');
    });
    console.log(eventsData, 'temp2');
  };

  useEffect(() => {
    // debugger;
    // setEvents(eventsData);
    // console.log(eventsData, 'temp');
    initComponent('r');
  }, []);

  useEffect(() => {
    console.log(events, 'events use');
  }, [events]);

  return (
    <>
      <Grid className="search-container" container spacing={2}>
        <Grid item xs={12}>
          <h1>Search Results: Cheese</h1>
        </Grid>
        <Box sx={{ width: '1400px', padding: '2rem 0' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
              <Tab label="About" {...a11yProps(0)} />
              <Tab label="Clubs" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            tet
            {/* {eventsData.map((event) => {
              return <div>{event._id}</div>;
            })} */}
          </TabPanel>
          <TabPanel value={value} index={1}>
            test
          </TabPanel>
        </Box>
      </Grid>
    </>
  );
};

export default SearchResults;
