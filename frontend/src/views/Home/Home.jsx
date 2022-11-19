import EventsCard from '../../components/EventsCard/EventsCard';
import UpcomingEvents from '../../components/UpcomingEvents/UpcomingEvents';
import { Typography, Grid, Box, Button } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Calendar from '../../components/Calendar/Calendar';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvs, setUpcomingEvs] = useState([]);
  const [clubList, setClubList] = useState([]);
  const { data: userData } = useTypedSelector((state) => state.auth);
  const [feedView, setFeedView] = useState(true);
  const navigate = useNavigate();
  
  const getEvents = async () => {
    const config = {
      method: 'post',
      url: 'events/latestfromclubs',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        clubIds: userData.clubsJoined
      }
    };
    const res = await axios(config);
    return res.data;
  };

  const getClubs = async () => {
    const config = {
      method: 'get',
      url: 'clubs/',
    };

    const res = await axios(config);
    return res.data;
  };

  const initComponent = async () => {
    try {
      const formattedEvents = [];
      const updatedUser = userData;
      const rawClubs = await getClubs();
      const rawEvents = await getEvents();
      setClubList(rawClubs);

      const clubDict = [];
      rawClubs.forEach((club) => {
        clubDict[[club._id]] = club.name;
      });

      rawEvents.forEach((event) => {
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
          numberOfAttendees: event.attendees.length,
          eventId: event._id,
          registerClickHandler: '',
          shareClickHandler: '',
          withinClub: false,
          registered: (updatedUser.eventsAttended.indexOf(event._id) !== -1 ? true : false),
          clubAdminView: false
        };
        if (dayStart >= new Date()) {
          formattedEvents.push(eventObj);
        }
      });
      setEvents(formattedEvents);
      setUpcomingEvs(formattedEvents);
    } catch (error) {
    }
  };

  useEffect(() => {
    initComponent();
    console.log(events.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderEventCards = (event) => {
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
  };

  const renderNoEvents = () => {
    return (
      <>
        <Box sx={{textAlign: 'center'}}>
          <br/>
          <Typography sx={{color: '#808780', fontFamily: 'Raleway, sans-serif'}}>
            Looks like you haven't joined any clubs. Try joining clubs <br/>
            to see events happening.
          </Typography>
          <br/>
          <Button variant='contained' onClick={() => {navigate('/discover-clubs');}} 
          sx={{
            fontSize: '16px', 
            px: '40px', 
            py: '16px', 
            borderRadius: '8px',
            boxShadow: 'unset'}}>
            Discover clubs
          </Button>
        </Box>
      </>
    );
  };

  const renderTabs = () => {
    const tabButtonStyles = {flexGrow: '1', boxShadow: 'unset', py: '13px'};
    return (
      <>
        <Button onClick={() => setFeedView(true)} variant={feedView ? 'contained' : 'text'} sx={tabButtonStyles}>My feed</Button>
        <Button onClick={() => setFeedView(false)} variant={feedView ? 'text' : 'contained'} sx={tabButtonStyles}>Calendar</Button>
      </>
    );
  };

  const styleLatestEvents = {
    fontFamily: 'Oswald',
    fontWeight: 400,
    fontSize: 18,
    opacity: 0.4,
    mb: 2,
    display: {xs: 'none', lg: 'inline'}
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1200 && !feedView) {setFeedView(true);}
  });

  return (
    <>
      <Box sx={{display: {xs: 'flex', lg: 'none'}, gap: '26px', borderBottom: '1px solid #E0E2E0', px: '24px', py: '12px', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.08)'}}>
        {renderTabs()}
      </Box>
      <Grid container xs={12} columnSpacing={{ xs: 3 }} sx={{pl: '24px'}}>
        <Grid item xs={12} lg={9} sx={{ mt: 4 }}>
          <Typography sx={styleLatestEvents}>Latest Events</Typography>
          {(feedView) ? 
            ( (events.length !== 0) ? events.map((event) => renderEventCards(event)) : renderNoEvents() ) : 
            <UpcomingEvents title={'Upcoming Events'} upcomingEvents={upcomingEvs} />}
        </Grid>
        <Grid item xs={12} lg={2} sx={{ mt: 4, display: {xs: 'none', lg: 'block'} }}>
          <UpcomingEvents upcomingEvents={upcomingEvs} />
            <Calendar />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
