/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
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

  const getClubs = async () => {
    const config = {
      method: 'get',
      url: 'clubs/'
    };

    const res = await axios(config);
    return res.data;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setSearchValue(searchBy);
    console.log(searchBy);
  }, [searchBy]);

  useEffect(() => {
    setSearchclubs([...clubsData]);
  }, [clubsData]);

  const eventInit = async () => {
    try {
      const formattedEvents = [];
      const rawClubs = await getClubs();
      // setClubList(rawClubs);

      const clubDict = [];
      rawClubs.forEach((club) => {
        clubDict[[club._id]] = club.name;
      });

      eventsData.forEach((event) => {
        const dayStart = new Date(event.startDate);
        const eventObj = {
          clubName: clubDict[[event.clubId]],
          clubLogoUrl: 'https://picsum.photos/200/200',
          eventName: event.name,
          eventDesc: event.description,
          eventDate: dayStart.toISOString().substring(0, 10),
          eventTime: '6:00PM',
          eventLoc: event.location,
          eventPrice: event.price,
          eventImgUrl: event.featureImage,
          numberOfAttendees: 100,
          eventId: event._id,
          registerClickHandler: '',
          shareClickHandler: '',
          attendeeImgUrlList: [
            'https://picsum.photos/200/300?random=1',
            'https://picsum.photos/200/300?random=2',
            'https://picsum.photos/200/300?random=3',
            'https://picsum.photos/200/300?random=4',
            'https://picsum.photos/200/300?random=5'
          ],
          withinClub: false,
          registered: false,
          clubAdminView: false
        };
        formattedEvents.push(eventObj);
      });
      setSearchevents(formattedEvents);
    } catch (error) {
      console.log('failed to initialize component Home');
    }
  };

  useEffect(() => {
    eventInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {searchEvents.length === 0
              ? 'No Events'
              : searchEvents.map((event) => {
                  return (
                    <EventsCard
                      clubName={event.clubName}
                      clubLogoUrl={event.clubLogoUrl}
                      eventName={event.eventName}
                      eventDesc={event.eventDesc}
                      eventDate={event.eventDate}
                      eventTime={event.eventTime}
                      eventLoc={event.eventLoc}
                      eventPrice={event.eventPrice}
                      eventImgUrl={event.eventImgUrl}
                      numberOfAttendees={event.numberOfAttendees}
                      registerClickHandler={event.registerClickHandler}
                      eventId={event.eventId}
                      shareClickHandler={event.shareClickHandler}
                      attendeeImgUrlList={event.attendeeImgUrlList}
                      withinClub={event.withinClub}
                      registered={event.registered}
                      clubAdminView={event.clubAdminView}
                    />
                  );
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
