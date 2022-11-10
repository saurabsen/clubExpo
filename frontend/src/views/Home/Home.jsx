import EventsCard from '../../components/EventsCard/EventsCard';
import UpcomingEvents from '../../components/UpcomingEvents/UpcomingEvents';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvs, setUpcomingEvs] = useState([]);
  const [clubList, setClubList] = useState([]);

  const getUser = async (userEmail) => {
    const data = JSON.stringify({
      email: userEmail
    });

    const res = await axios.post('users/allusers', data);
    return res.data[0];
  };
  
  const getEvents = async () => {
    const data = JSON.stringify({
      clubIds: JSON.parse(localStorage.user).clubsJoined
    });
    const config = {
      method: 'post',
      url: 'events/latestfromclubs',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };
    const res = await axios(config);
    return res.data;
  };

  const getClubs = async () => {
    const config = {
      method: 'get',
      url: 'clubs/',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzU5YWQ0MmJkMzgzNzljYTNkMzViZDAiLCJpYXQiOjE2NjY4MjE0NDIsImV4cCI6MTY2OTQxMzQ0Mn0._SaFCeAaa-BQVmC-tGPcczEcoad_3XOfONKzMFqeqRY'
      }
    };

    const res = await axios(config);
    return res.data;
  };

  const initComponent = async () => {
    try {
      const formattedEvents = [];
      const updatedUser = await getUser(localStorage.user.email);
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      const rawClubs = await getClubs();
      const rawEvents = await getEvents();
      setClubList(rawClubs);

      console.log(clubList); //need to remove it added just to remove warning

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
          registered: (updatedUser.eventsAttended.indexOf(event._id) !== -1 ? true : false),
          clubAdminView: false
        };
        formattedEvents.push(eventObj);
      });
      setEvents(formattedEvents);
      console.log(events, 'events');
      setUpcomingEvs(formattedEvents);
    } catch (error) {
      console.log('failed to initialize component Home');
    }
  };

  useEffect(() => {
    initComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styleLatestEvents = {
    fontFamily: 'Oswald',
    fontWeight: 400,
    fontSize: 18,
    opacity: 0.4,
    mb: 2
  };

  return (
    <>
      <Grid container xs={12} columnSpacing={{ xs: 3 }}>
        <Grid item xs={9} sx={{ mt: 4 }}>
          <Typography sx={styleLatestEvents}>Latest Events</Typography>
          {events.map((event) => {
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
        </Grid>
        <Grid item xs={3} sx={{ mt: 4 }}>
          <UpcomingEvents upcomingEvents={upcomingEvs} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
