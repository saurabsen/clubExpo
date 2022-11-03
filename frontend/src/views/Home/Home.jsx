import EventsCard from '../../components/EventsCard/EventsCard';
import UpcomingEvents from '../../components/UpcomingEvents/UpcomingEvents';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvs, setUpcomingEvs] = useState([]);
  const [clubList, setClubList] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const getEvents = async () => {
    const data = JSON.stringify({
      // clubIds: ['1234', '2345', '63573f4a54aef5c865de7107', '635cc70ca5cc5e9114f2d03e']
      clubIds: userInfo.clubsJoined
    });
    const config = {
      method: 'post',
      url: 'http://localhost:3001/api/events/latestfromclubs',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzUwMmRiMzRhMjcwYmY0ZDFhMjc5MWIiLCJpYXQiOjE2NjYxOTg5NjMsImV4cCI6MTY2ODc5MDk2M30.lPOmtB9fdmlIhDIj_R4yAvnt04ZWmuReNPNESVAak_8'
      },
      data: data
    };
    const res = await axios(config);
    return res.data;
  };

  const getUser = async (userEmail) => {
    const data = JSON.stringify({
      email: userEmail
    });

    const config = {
      method: 'post',
      url: 'http://localhost:3001/api/users/allusers',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    const res = await axios(config);
    return res.data[0];
  };


  const getClubs = async () => {
    const config = {
      method: 'get',
      url: 'http://localhost:3001/api/clubs/',
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
      const rawClubs = await getClubs();
      const rawEvents = await getEvents();
      setClubList(rawClubs);

      const clubDict = [];
      rawClubs.forEach((club) => {
        clubDict[[club._id]] = club.name;
      });

      rawEvents.forEach((event) => {
        const dayStart = new Date(event.startDate);
        const registeredBoolean = (
          userInfo.eventsAttended && userInfo.eventsAttended.indexOf(event._id) !== -1 ? true : false
          );
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
          registered: registeredBoolean,
          clubAdminView: false
        };
        formattedEvents.push(eventObj);
      });
      setEvents(formattedEvents);
      setUpcomingEvs(formattedEvents);
    } catch (error) {
      console.log('failed to initialize component Home');
    }
  };

  useEffect(() => {
    (async () => {
      setUserInfo(await getUser(localStorage.user.email));
    })();
  }, []);
  
  useEffect(() => {
    if (userInfo) {
      localStorage.user = JSON.stringify(userInfo);
      initComponent();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

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
        <Grid item xs={9}>
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
        <Grid item xs={3}>
          <UpcomingEvents upcomingEvents={upcomingEvs} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
