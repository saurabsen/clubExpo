import axios from 'axios';
import { useEffect, useState } from 'react';

import './EventPage.css';
import { ReactComponent as DefaultBannerSvg } from '../../assets/banners/default.svg';
import { ReactComponent as ShareSvg } from '../../assets/icons/share.svg';
import locationSvg from '../../assets/icons/location.svg';
import calendarSvg from '../../assets/icons/calendar.svg';
import moneySvg from '../../assets/icons/money.svg';
import clockSvg from '../../assets/icons/clock.svg';
import { Button, TextField } from '@mui/material';
import { useRef } from 'react';

const EventPage = (props) => {
  const [event, setEvent] = useState({});
  const [clubInfo, setClubInfo] = useState();
  const [adminInfo, setAdminInfo] = useState();
  // const event = useRef({});
  // const clubInfo = useRef({});
  // const clubInfo = useRef({});

  // const userInfo = {
  //   _id: '6359ac5abd38379ca3d35aa9',
  //   eventsAttended: [],
  //   clubsJoined: [
  //     "63573f4a54aef5c865de7107"
  //   ]
  // };

  const getEvent = async (eventId) => {
    const config = {
      method: 'get',
      url: `http://localhost:3001/api/events/${eventId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzUwMmRiMzRhMjcwYmY0ZDFhMjc5MWIiLCJpYXQiOjE2NjYxOTg5NjMsImV4cCI6MTY2ODc5MDk2M30.lPOmtB9fdmlIhDIj_R4yAvnt04ZWmuReNPNESVAak_8'
      }
    };
    const res = await axios(config);
    return res.data;
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

  const getUser = async (userEmail) => {
    const data = JSON.stringify({
      "email": userEmail
    });
    
    const config = {
      method: 'post',
      url: 'http://localhost:3001/api/users/allusers',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    const res = await axios(config);
    return (res.data)[0];
  };

  const addEventToUserModel = () => {
    const config = {
      method: 'post',
      url: `http://localhost:3001/api/users/6359ac5abd38379ca3d35aac/attend/${event._id}`,
      headers: { },
    };
    axios(config);
  };

  const addUserToEventModel = () => {
    const config = {
      method: 'post',
      url: `http://localhost:3001/api/events/${event._id}/attendedby/6359ac2abd38379ca3d35aa4`,
      headers: { }
    };
    axios(config);
  };

  const removeEventFromUserModel = () => {
    const config = {
      method: 'post',
      url: 'http://localhost:3001/api/users/6359ac5abd38379ca3d35aac/unattend/63461ea1bb0903220f75154f',
      headers: { }
    };
    axios(config);
  };

  const removeUserFromEventModel = () => {
    const config = {
      method: 'post',
      url: 'http://localhost:3001/api/events/63461ea1bb0903220f75154f/unattendedby/6359ac2abd38379ca3d35aa4',
      headers: { }
    };
    axios(config);
  };

  const getMatchingClub = (clubObjs, clubId) => {
    const matchingClubs = clubObjs.filter(
      clubObj => (clubObj._id === clubId));
    return matchingClubs[0];
  };

  const updateClubInfo = async () => {
    console.log("updateClubInfo called");
    rawClubs = await getClubs();
    setClubInfo(getMatchingClub(rawClubs, event.clubId));
  };
  
  const updateAdminInfo = async () => {
    if (clubInfo) {
      console.log(">>>>clubinfo",clubInfo);
      rawAdminInfo = (await getUser(clubInfo.admins[0]));
      console.log(">>>>rawAdminInfo",rawAdminInfo);
      await setAdminInfo(rawAdminInfo);
      console.log(">>>>adminInfo",adminInfo);
    }
  };

  let rawClubs;
  let rawAdminInfo;
  
  const initEvent = async () => {
    console.log("initEvent called");
    try {
      const { eventId } = props;
      const rawEvent = await getEvent(eventId);
      setEvent(rawEvent);
      console.log('event', event);
      const userInfo = await getUser('nhugnin2@studiopress.com');
      console.log(userInfo);
    } catch (error) {
      console.log("'", 'failed to load component Event Page:' + error.message);
    }
  };
  
  useEffect(() => {
    initEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {

  }, [event]);
  
  useEffect(() => {
    updateClubInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
  
  useEffect(() => {
    updateAdminInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clubInfo]);

  const renderEventLinks = () => {
    return (
      <div className="eventscard-buttons">
        <Button variant="outlined">
          <ShareSvg />
        </Button>
        <Button style={{ width: '100%' }} variant="contained">
          Register
        </Button>
      </div>
    );
  };

  const onClickHandler = () => {
    registerUser();
    unregisterUser();
  };

  const registerUser = () => {
    addEventToUserModel();
    addUserToEventModel();
  };

  const unregisterUser = () => {
    removeEventFromUserModel();
    removeUserFromEventModel();
  };

  const renderEventDetails = () => {
    return (
      <>
        <div>
          <h4 className="desktop-event-name">{event.name}</h4>
        </div>
        <div className="eventscard-main">
          <p>{event.desc}</p>
        </div>
        <div className="eventscard-footer">
          <div className="eventscard-footer-line">
            <p>
              <span>
                <img src={calendarSvg} alt="Date" className="cardicon" />
              </span>{' '}
              {event.startDate ? new Date(event.startDate).toISOString().substring(0, 10) : ''}
            </p>
            <p>
              <span>
                <img src={clockSvg} alt="Time" className="cardicon" />
              </span>{' '}
              {event.time ?? '6:00PM'}
            </p>
          </div>
          <div className="eventscard-footer-line">
            <p>
              <span>
                <img src={locationSvg} alt="Location" className="cardicon" />
              </span>{' '}
              {event.location}
            </p>
            <p>
              <span>
                <img src={moneySvg} alt="Price" className="cardicon" />
              </span>{' '}
              {event.price ?? 'FREE'}
            </p>
          </div>
          <div>
            <h4 className="desktop-event-name">About Event</h4>
            <p>{event.description ?? ''}</p>
          </div>
        </div>
      </>
    );
  };

  const renderClubInfo = () => {
    const styleClubAdminImg = {
      backgroundImage: `url("${adminInfo.profileImage}")`,
      backgroundSize: 'cover'
    };

    return (
      <div className='event-club-info'>
        <h1>Club Info</h1>
        <div className='club-admin-img' style={styleClubAdminImg}></div>
        <p>{clubInfo.name}</p>
        <p>{adminInfo.firstName + " " + adminInfo.lastName}</p>
      </div>
    );
  };

  const renderEventComments = () => {
    return (
      <div className='event-comments'>
        <div>
          <h4 className="desktop-event-name">Write Comments</h4>
          <textarea className='comment-textarea' placeholder='Write Comment'/>
          <Button variant="contained" color="secondary">
            Comment
          </Button>
        </div>
        <div>
          <h4 className="desktop-event-name">Comments (4)</h4>
        </div>
      </div>
    );
  };

  const renderEventContainer = () => {
    return (
      <div className="event-container">
        <div
          className="event-details"
          style={{ width: '70%', borderRight: '1px solid rgba(0, 0, 0, 0.1)' }}
        >
          {renderEventDetails()}
          {adminInfo ? renderClubInfo() : "adminInfor is empty"}
          {renderEventComments()}
        </div>
        <div className="event-links">{renderEventLinks()}</div>
      </div>
    );
  };

  return (
    <>
      <div className="hero-container">
        <DefaultBannerSvg className="hero-banner" />
      </div>
      {event ? renderEventContainer() : ''}
    </>
  );
};

export default EventPage;
