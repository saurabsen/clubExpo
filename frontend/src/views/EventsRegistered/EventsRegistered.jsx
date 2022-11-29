/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './eventsregistered.css';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import UpcomingEvents from '../ClubDetail/UpcomingEvents';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const EventsRegistered = () => {
  const { getAllEventsData } = useActions();
  const { data: userData } = useTypedSelector((state) => state.auth);
  const eventsData = useTypedSelector((state) => state.events);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEventsData('user', { userid: userData._id });
  }, []);

  useEffect(() => {
    const formattedEvents = [];
    eventsData.data.forEach((event) => {
      const dayStart = new Date(event.startDate);
      const eventObj = {
        clubName: 'Random name',
        clubLogoUrl: 'https://picsum.photos/200/200',
        eventName: event.name,
        eventDesc: event.description,
        eventDate: dayStart.toISOString().substring(0, 10),
        eventTime: '6:00 PM',
        eventLoc: event.location,
        eventPrice: event.price,
        eventImgUrl: event.featureImage,
        numberOfAttendees: event.attendees.length,
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
    setEvents(formattedEvents);
  }, [eventsData]);

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: '4rem' }}>
        <Grid container spacing={3} sx={{ p: 2 }}>
          <Grid item xs={12} md={12}>
            <h3>Events Registered</h3>
          </Grid>
          {events.length > 0 ? (
            <Grid item xs={12} md={12}>
              <UpcomingEvents title={''} events={events} />
            </Grid>
          ) : (
            <Grid item xs={12} md={12}>
              <Box sx={{ textAlign: 'center' }}>
                <br />
                <Typography sx={{ color: '#808780', fontFamily: 'Raleway, sans-serif' }}>
                  Looks like you haven't registered in any events. Try joining clubs <br />
                  to see events happening.
                </Typography>
                <br />
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate('/discover-clubs');
                  }}
                  sx={{
                    fontSize: '16px',
                    px: '40px',
                    py: '16px',
                    borderRadius: '8px',
                    boxShadow: 'unset'
                  }}
                >
                  Discover clubs
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default EventsRegistered;
