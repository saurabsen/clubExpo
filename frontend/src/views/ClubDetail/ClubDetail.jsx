/* eslint-disable react-hooks/exhaustive-deps */
import './clubdetail.css';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import AboutClub from './AboutClub';
import UpcomingEvents from './UpcomingEvents';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Charts from '../../components/Charts/Charts';
import ClubMembers from './ClubMembers';
import Modal from '@mui/material/Modal';
import { format } from 'date-fns';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4
};

const ClubDetail = () => {
  const { getAllClubsData, getAllEventsData, getClubMembersData } = useActions();
  const { data: clubsDetailData } = useTypedSelector((state) => state.clubs);
  const clubEventsData = useTypedSelector((state) => state.events);
  const clubMembersData = useTypedSelector((state) => state.clubMember);
  const { data: userData } = useTypedSelector((state) => state.auth);
  const [clubStatus, setClubStatus] = useState(false);
  const [events, setEvents] = useState([]);
  const [attendeesAnalyticsData, setAttendeesAnalyticsData] = useState([]);
  const [eventChartTitle, setEventChartTitle] = useState('');
  const [attendeesChartTitle, setAttendessChartTitle] = useState('');
  const [value, setValue] = useState('1');
  const dense = false;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    getClubMembersData('', { clubid: id }).then((resp) => {
      if (resp) {
        setOpenModal(true);
      }
    });
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [previousEvents, setPreviousEvents] = useState([]);
  const [chartEventAnalyticsData, setChartEventAnalyticsData] = useState([]);

  const getClubMemberStatus = async () => {
    const { data } = await axios.get(`clubmembers/${userData._id}/${id}`);
    data[0] !== undefined
      ? setClubStatus({ status: data[0]?.status, request: data[0]?.request })
      : setClubStatus({ status: false, request: false });
  };

  useEffect(() => {
    getAllClubsData(id);
    getAllEventsData('latestfromclubs', { clubIds: [id] });
    getClubMemberStatus();
  }, []);

  const optionsEvents = {
    title: 'Total events registered',
    chartArea: { width: '80%' },
    hAxis: {
      title: 'Days'
    },
    vAxis: {
      title: 'Events',
      minValue: 0
    }
  };

  const optionsRegistration = {
    title: 'Total  Registrations',
    chartArea: { width: '80%' },
    hAxis: {
      title: 'Days'
    },
    vAxis: {
      title: 'Registrations',
      minValue: 0
    }
  };

  useEffect(() => {
    getClubMembersData('', { clubid: id });
    const getEventsData = async () => {
      return await axios.get(`/events/previousevents/${id}`);
    };
    getEventsData().then((resp) => {
      if (resp) {
        setPreviousEvents(resp.data);
      }
    });
  }, []);

  useEffect(() => {
    const chartData = [['Days', 'Events', { role: 'style' }]];
    const attendeesChartData = [['Days', 'Registrations', { role: 'style' }]];
    const uniqueDates = [...new Set(previousEvents.map((item) => new Date(item.startDate)))].sort(
      (date1, date2) => date1 - date2
    );
    const chartEventAnalytics = [];
    const registrationAnalytics = [];
    let totalEvents = 0;
    let totalRegistration = 0;
    uniqueDates.forEach((uniquedata) => {
      let newArray = previousEvents.filter((data) => {
        const date1 = new Date(data.startDate);
        if (
          date1.getFullYear() === uniquedata.getFullYear() &&
          date1.getMonth() === uniquedata.getMonth() &&
          date1.getDate() === uniquedata.getDate()
        ) {
          return data;
        }
      });
      chartEventAnalytics[format(uniquedata, 'dd MMM yyyy')] = newArray.length;
      let attendees = newArray.reduce((acc, obj) => {
        return acc + obj.attendees.length;
      }, 0);
      registrationAnalytics[format(uniquedata, 'dd MMM yyyy')] = attendees;
      console.log(newArray);
      totalEvents += newArray.length;
      totalRegistration += attendees;
    });

    for (let key in chartEventAnalytics) {
      chartData.push([key, chartEventAnalytics[key], '#8658CE']);
    }

    for (let dateKey in registrationAnalytics) {
      attendeesChartData.push([dateKey, registrationAnalytics[dateKey], '#8658CE']);
    }

    setChartEventAnalyticsData(chartData);
    setAttendeesAnalyticsData(attendeesChartData);
    setEventChartTitle('Total Events (' + totalEvents + ')');
    setAttendessChartTitle('Total Registrations (' + totalRegistration + ')');
  }, [previousEvents]);

  useEffect(() => {
    const formattedEvents = [];
    clubEventsData.data.forEach((event) => {
      const dayStart = new Date(event.startDate);
      const eventObj = {
        clubName: 'Random name',
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
    setEvents(formattedEvents);
  }, [clubEventsData]);

  const joinClub = async () => {
    const addClubMember = await axios.post(`clubmembers/add`, { clubid: id, userid: userData._id });
    getClubMemberStatus();
  };

  const addClubMember = async (memberid) => {
    const addClubMember = await axios.post(`clubmembers/addclubmember`, {
      clubid: id,
      userid: memberid
    });
    getClubMembersData('', { clubid: id });
  };

  const deleteClubUser = async (memberid) => {
    const deleteClubMember = await axios.delete(`clubmembers/${memberid}/${id}`);
    getAllClubsData(id);
    getClubMembersData('', { clubid: id });
  };

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Card sx={{ width: '100%', height: '500px', pb: 4 }}>
          <CardMedia
            component="img"
            height="80"
            image={clubsDetailData.coverImage}
            alt="green iguana"
          />
        </Card>
        <Grid spacing={4} sx={{ pt: 4, pl: 4, pr: 4, pb: 4 }} container>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h4" sx={{ pb: 1 }}>
              {clubsDetailData.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid spacing={4} container>
              <Grid item xs={12} md={4}></Grid>
              <Grid item xs={12} md={8}>
                {userData !== null &&
                userData.userRole !== undefined &&
                userData.userRole.includes('member') &&
                userData._id !== clubsDetailData.createdBy ? (
                  <Button style={{ width: '100%' }} variant="contained" onClick={joinClub}>
                    {clubStatus.status && !clubStatus.request
                      ? 'Joined'
                      : !clubStatus.status && clubStatus.request
                      ? 'Requested'
                      : 'Join'}
                  </Button>
                ) : (
                  <Link to="./createevent" relative="path">
                    <Button style={{ width: '100%' }} variant="contained">
                      Create event
                    </Button>
                  </Link>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />

        <Grid spacing={4} sx={{ pt: 4, pl: 4, pr: 4 }} container>
          {userData !== null &&
          clubsDetailData !== null &&
          userData.userRole !== undefined &&
          userData.userRole.includes('member') &&
          clubsDetailData.acceptedMembers !== undefined &&
          !clubsDetailData.acceptedMembers.includes(userData._id) &&
          userData._id !== clubsDetailData.createdBy ? (
            <>
              <Grid item xs={12} md={8}>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <AboutClub about={clubsDetailData.description} />
                  </Grid>
                  <Grid sx={{ pt: 4 }} item xs={12} md={12}>
                    {events.length > 0 ? (
                      <UpcomingEvents title={'Upcoming Events'} events={events} />
                    ) : (
                      ''
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container>
                  <Grid sx={{ pb: 6 }} item xs={12} md={12}>
                    <Typography variant="h5" component="h5" sx={{ pb: 1 }}>
                      Admin
                    </Typography>
                    <List
                      sx={{
                        width: '100%',
                        backgroundColor: '#F3EFFB',
                        padding: '15px 10px 15px 10px'
                      }}
                    >
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            sx={{ border: '8px' }}
                            alt="Remy Sharp"
                            src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f"
                          />
                        </ListItemAvatar>
                        <ListItemText primary={clubsDetailData.admins} />
                      </ListItem>
                    </List>
                  </Grid>
                  {userData !== null &&
                  clubsDetailData !== null &&
                  userData.userRole !== undefined &&
                  clubsDetailData.acceptedMembers !== undefined &&
                  userData.userRole.includes('member') &&
                  !clubsDetailData.acceptedMembers.includes(userData._id) &&
                  userData._id !== clubsDetailData.createdBy ? (
                    <Grid item xs={12} md={12}>
                      <Grid container>
                        <Grid item xs={6} md={6}>
                          <Typography variant="h5" component="h5" sx={{ pb: 1 }}>
                            Members
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} sx={{ textAlign: 'right' }}>
                          <Button
                            variant="text"
                            onClick={() => {
                              handleOpenModal();
                            }}
                          >
                            View all
                          </Button>
                        </Grid>
                      </Grid>
                      <Box
                        sx={{
                          backgroundColor: '#F3EFFB',
                          padding: '35px 20px 35px 20px',
                          borderRadius: '4%'
                        }}
                      >
                        <ImageList sx={{ width: 400, height: 150 }} cols={5} rowHeight={70}>
                          {clubMembersData.data !== null &&
                            clubMembersData.data !== undefined &&
                            clubMembersData.data.length > 0 &&
                            clubMembersData.data
                              .filter((data) => data.status)
                              .map((item) => (
                                <ImageListItem key={item._id}>
                                  <img
                                    src={`${item.profileImage}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item.profileImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.firstName}
                                    loading="lazy"
                                  />
                                </ImageListItem>
                              ))}
                        </ImageList>
                      </Box>
                    </Grid>
                  ) : (
                    ''
                  )}
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid item xs={12} md={12}>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab className="tabfonts" label="Events" value="1" />
                      <Tab className="tabfonts" label="Members" value="2" />
                      <Tab className="tabfonts" label="About" value="4" />
                      {userData !== null &&
                        userData.userRole !== undefined &&
                        userData.userRole.includes('clubAdmin') && (
                          <Tab className="tabfonts" label="Reports" value="5" />
                        )}
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    {events.length > 0 ? (
                      <UpcomingEvents title={'Upcoming Events'} events={events} />
                    ) : (
                      ''
                    )}
                  </TabPanel>
                  <TabPanel value="2">
                    <Grid spacing={4} sx={{ pt: 2 }} container>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: 'flex', flexFlow: 'wrap', gap: '1rem' }}
                      >
                        {userData !== null &&
                          userData.userRole !== undefined &&
                          userData.userRole.includes('clubAdmin') && (
                            <Typography
                              sx={{ flexBasis: '100%', pb: 1 }}
                              variant="h5"
                              component="h5"
                            >
                              Existing Members (
                              {clubMembersData.data !== null &&
                                clubMembersData.data !== undefined &&
                                clubMembersData.data.filter((data) => data.status).length}
                              )
                            </Typography>
                          )}

                        {clubMembersData.data !== null &&
                          clubMembersData.data !== undefined &&
                          clubMembersData.data.length > 0 &&
                          clubMembersData.data
                            .filter((data) => data.status)
                            .map((item) => (
                              <div style={{ flexBasis: '48%' }}>
                                {' '}
                                <ClubMembers
                                  key={item._id}
                                  item={item}
                                  userData={userData}
                                  deleteClubUser={deleteClubUser}
                                />
                              </div>
                            ))}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: 'flex', flexFlow: 'wrap', gap: '1rem' }}
                      >
                        {userData !== null &&
                          userData.userRole !== undefined &&
                          userData.userRole.includes('clubAdmin') && (
                            <>
                              <Typography
                                variant="h5"
                                component="h5"
                                sx={{ pb: 1, flexBasis: '100%' }}
                              >
                                Requests (
                                {clubMembersData.data !== null &&
                                  clubMembersData.data !== undefined &&
                                  clubMembersData.data.filter((data) => data.request).length}
                                )
                              </Typography>

                              {clubMembersData.data !== null &&
                                clubMembersData.data !== undefined &&
                                clubMembersData.data.length > 0 &&
                                clubMembersData.data
                                  .filter((data) => data.request)
                                  .map((item) => (
                                    <div style={{ flexBasis: '48%' }}>
                                      {' '}
                                      <ClubMembers
                                        key={item._id}
                                        item={item}
                                        userData={userData}
                                        deleteClubUser={deleteClubUser}
                                        addClubMember={addClubMember}
                                      />
                                    </div>
                                  ))}
                            </>
                          )}
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="4">
                    <Grid spacing={4} sx={{ pt: 2 }} container>
                      <Grid item xs={12} md={8}>
                        <AboutClub about={clubsDetailData.description} />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h5" component="h5" sx={{ pb: 1 }}>
                          Admin
                        </Typography>
                        <List
                          sx={{
                            width: '100%',
                            backgroundColor: '#F3EFFB',
                            padding: '15px 10px 15px 10px',
                            borderRadius: '4%'
                          }}
                        >
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar
                                alt="Remy Sharp"
                                src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f"
                              />
                            </ListItemAvatar>
                            <ListItemText primary={clubsDetailData.admins} />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="5">
                    <Grid sx={{ pt: 2 }} container>
                      <Grid item xs={12} md={12} sx={{ pb: 3 }}>
                        <Charts
                          options={optionsEvents}
                          title={eventChartTitle}
                          chartData={chartEventAnalyticsData}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Charts
                          zoptions={optionsRegistration}
                          title={attendeesChartTitle}
                          chartData={attendeesAnalyticsData}
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                </TabContext>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Members
          </Typography>
          <Demo>
            <List dense={dense}>
              {clubMembersData.data.map((item) => (
                <ClubMembers
                  key={item._id}
                  item={item}
                  userData={userData}
                  deleteClubUser={deleteClubUser}
                />
              ))}
            </List>
          </Demo>
        </Box>
      </Modal>
    </>
  );
};

export default ClubDetail;
