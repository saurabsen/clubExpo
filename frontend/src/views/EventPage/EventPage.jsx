import axios from 'axios';
import { useEffect, useState } from 'react';
import './EventPage.css';
import { Location, Calender, Money, Clock } from '../../assets';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Share } from '../../assets/Icons/share.svg';
import { Button, Card, Grid, Box, CardMedia, TextField, Typography } from '@mui/material';
import { BackButton } from '../../components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const EventPage = (props) => {
  const [event, setEvent] = useState({});
  const [clubInfo, setClubInfo] = useState();
  const [adminInfo, setAdminInfo] = useState();
  const [userInfo, setUserInfo] = useState();
  const [mainButton, setMainButton] = useState();
  const { data: userData } = useTypedSelector((state) => state.auth);
  const { getUser, addUserToEventModel, removeUserFromEventModel, addEventToUserModel, removeEventFromUserModel } = useActions();

  console.log("userData", userData);
  // getUser();

  const navigate = useNavigate();

  const getEvent = async (eventId) => {
    const config = {
      method: 'get',
      url: `events/${eventId}`,
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

  const getUserByEmail = async (userEmail) => {
    const data = JSON.stringify({
      email: userEmail
    });

    const config = {
      method: 'post',
      url: 'users/allusers',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    const res = await axios(config);
    return res.data[0];
  };

  const getMatchingClub = (clubObjs, clubId) => {
    const matchingClubs = clubObjs.filter((clubObj) => clubObj._id === clubId);
    return matchingClubs[0];
  };

  const updateClubInfo = async () => {
    rawClubs = await getClubs();
    setClubInfo(getMatchingClub(rawClubs, event.clubId));
  };

  const updateAdminInfo = async () => {
    rawAdminInfo = await getUserByEmail(clubInfo.admins[0]);
    setAdminInfo(rawAdminInfo);
  };

  const registerUser = () => {
    addUserToEventModel(event._id, userData._id);
    addEventToUserModel(userData._id, event._id);
  };

  const unregisterUser = () => {
    removeUserFromEventModel(event._id, userData._id);
    removeEventFromUserModel(userData._id, event._id);
  };

  let rawClubs;
  let rawAdminInfo;

  const initEvent = async () => {
    try {
      const { eventId } = props;
      const rawEvent = await getEvent(eventId);
      setEvent(rawEvent);
    } catch (error) {
      console.log("'", 'failed to load component Event Page:' + error.message);
    }
  };

  const selectButton = () => {
    // console.log('userData in selectButton', userData);
    const eventLoc = userData.eventsAttended.indexOf(event._id);
    if (eventLoc !== -1) {
      return (
        <Button style={{ width: '100%' }} variant="outlined" onClick={unregisterUser}>
          Unregister
        </Button>
      );
    } else {
      return (
        <Button style={{ width: '100%' }} variant="contained" onClick={registerUser}>
          Register
        </Button>
      );
    }
  };

  useEffect(() => {
    initEvent();
    console.log('*** initEvent completed');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
      
  useEffect(() => {
    if (userData) {
      setMainButton(selectButton());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, userData]);

  useEffect(() => {
    updateClubInfo();
    console.log('*** updateClubInfo completed');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  useEffect(() => {
    if (clubInfo) {
      updateAdminInfo();
      // (async () => {updateAdminInfo();})();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clubInfo]);

  const renderEventLinks = () => {
    return (
      <Box className="eventpage-buttons" sx={{
        display: 'flex',
        flexFlow: 'row',
        gap: '20px'
      }}>
        <Button variant="outlined" sx={{width: '100px'}}>
          <Share />
        </Button>
        {mainButton ? mainButton : null}
      </Box>
    );
  };

  const renderEventDetails = () => {
    return (
      <Box sx={{
        mb: '40px',
      }}>
        <div>
          <h4 className="event-name">{event.name}</h4>
        </div>
        <div className="eventscard-main">
          <Typography sx={{
            fontColor: '#666666',
          }}>{event.desc}</Typography>
        </div>
        <Box className="eventscard-footer" sx={{
          display: 'flex',
          flexFlow: 'column',
          gap: '24px'
        }}>
          <div className="eventpage-footer-line">
            <p>
              <span>
                <img src={Calender} alt="Date" className="cardicon" />
              </span>{' '}
              {event.startDate ? new Date(event.startDate).toISOString().substring(0, 10) : ''}
            </p>
            <p>
              <span>
                <img src={Clock} alt="Time" className="cardicon" />
              </span>{' '}
              {event.time ?? '6:00PM'}
            </p>
          </div>
          <div className="eventpage-footer-line">
            <p>
              <span>
                <img src={Location} alt="Location" className="cardicon" />
              </span>{' '}
              {event.location}
            </p>
            <p>
              <span>
                <img src={Money} alt="Price" className="cardicon" />
              </span>{' '}
              {event.price ?? 'FREE'}
            </p>
          </div>
          <Box sx={{display: 'flex', flexFlow: 'column', gap: '16px'}}>
            <Box sx={{display: {xs: 'none', md: 'inline'}}}>
              <h4>About Event</h4>
            </Box>
            <p>{event.description ?? ''}</p>
          </Box>
        </Box>
      </Box>
    );
  };

  const renderClubInfo = () => {
    const styleClubAdminImg = {
      backgroundImage: `url("${adminInfo.profileImage}")`,
      backgroundSize: 'cover',
      borderRadius: '8px'
    };

    return (
      <Link to={`/clubs/${clubInfo._id}`}>
        <Box className="event-club-info" sx={{
          mb: '24px'
        }}>
          <Card sx={{p: '24px',
            borderRadius: '8px',
            boxShadow: 'unset',
            border: {xs: 'solid 1px #E0E2E0', md: 'solid 1px #F3EFFB'},
            backgroundColor: {md: '#F3EFFB'},
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '16px'
          }}>
            <Box sx={{maxWidth: 'fit-content', padding: '0'}}>
              <Box className="club-admin-img" sx={styleClubAdminImg}></Box>
            </Box>
            <Box sx={{display: 'flex', flexFlow: 'column', gap: '8px'}}>
              <h5>{adminInfo.firstName + ' ' + adminInfo.lastName}</h5>
              <h6>{clubInfo.name}</h6>
            </Box>
          </Card>
        </Box>
      </Link>
    );
  };

  const renderEventComments = () => {
    return (
      <Box className="event-comments">
        <div>
          <Box sx={{display: {xs: 'none', md: 'block'}, mb: '16px'}}>
            <h4>Write Comments</h4>
          </Box>
          <TextField
            id="outlined-textarea"
            label="Write your comment here"
            fullWidth
            multiline
            sx={{
              width: 'auto',
              display: 'block',
              mb: '16px',
              zIndex: '5'
            }}
          />
          <Button variant="contained" color="secondary">
            Comment
          </Button>
        </div>
        <div>
          <h4 className="desktop-event-name">Comments (4)</h4>
        </div>
      </Box>
    );
  };

  const renderEventContainer = () => {
    return (
      <>
        <Grid container className="event-container" 
          direction='row'
          xs={12} 
          sx={{
            p: '20px',
        }}>
          <Grid item className="event-details"
            xs={12}
            md={8}
            sx={{
              pr: {md: '54px'},
              borderRight: {md: '1px solid hsla(0,0%,0%,.1)'}
          }}>
            {renderEventDetails()}
            <Box display={{md: 'none'}}>
              {adminInfo ? renderClubInfo() : 'adminInfo is empty'}
            </Box>
            {renderEventComments()}
          </Grid>
          <Grid item xs={0} md={4} display={{xs: 'none', md: 'block'}} 
            sx={{
              pl: '24px'
          }}>
            {renderEventLinks()}
            <Box sx={{mt: '92px',display: 'flex', flexFlow: 'column', gap: '16px'}}>
              <h4>Admin</h4>
              {adminInfo ? renderClubInfo() : 'adminInfo is empty'}
            </Box>
          </Grid>
        </Grid>
        <Box className="event-links" sx={{
          px: '18px',
          py: '24px',
          display: {xs: 'block', md: 'none'},
          background: 'white',
          boxShadow: '2px -2px 4px rgba(0, 0, 0, 0.08)',
          zIndex: '2000'
        }}>
          {renderEventLinks()}
        </Box>
      </>
    );
  };

  const renderBanner = () => {

    return (
      <Box sx={{position: 'relative'}}>
        <CardMedia
          component='img'
          image={event.featureImage}
          sx={{height: {xs: '211px', md: '462px'}}}
        />
        <Box onClick={() => {navigate(-1);}} sx={{position: 'absolute', top: '30px', left: '30px'}}>
          <BackButton />
        </Box>
      </Box>
    );
  };

  return (
    <Card sx={{width: '100%', border: 'unset', boxShadow: 'unset'}}>
      {renderBanner()}
      {event ? renderEventContainer() : ''}
    </Card>
  );
};

export default EventPage;
