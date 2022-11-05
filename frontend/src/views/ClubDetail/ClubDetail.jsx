import  './clubdetail.css';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Typography } from '@mui/material';
import { Chart } from "react-google-charts";
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
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';

export const data = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));


const ClubDetail = () => {
  const { getAllClubsData, getAllEventsData, getClubMembersData } = useActions();
  const clubsDetailData = useTypedSelector((state) => state.clubs);
  const clubEventsData = useTypedSelector((state) => state.events);
  const clubMembersData = useTypedSelector((state) => state.clubMember);
  const {data:userData} = useTypedSelector((state) => state.auth);
  const [clubStatus, setClubStatus ] = useState(false);
  const [events, setEvents] = useState({status: false, request:false});
  const [value, setValue] = useState('1');
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();

  const getClubMemberStatus = async () => {
    const { data } = await axios.get(`clubmembers/${userData._id}/${id}`);
    (data[0] !== undefined ? setClubStatus({status: data[0]?.status, request:data[0]?.request}) : setClubStatus({status: data[0]?.status, request:data[0]?.request}));
  };

  useEffect(() => {
    getAllClubsData(id);
    getAllEventsData('latestfromclubs',{  clubIds: [id] });
    getClubMemberStatus();
  },[]);

  useEffect(() => {
    if(clubsDetailData.data.acceptedMembers !== undefined){
      getClubMembersData('',{ userid: clubsDetailData.data.acceptedMembers, clubid: id});
    }
  },[clubsDetailData]);

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
  },[clubEventsData]);

  const joinClub = async () => {
    const addClubMember = await axios.post(`clubmembers/add`, {clubid:id, userid: userData._id});
    getClubMemberStatus();
    console.log(addClubMember);
  };

  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
  ];

  return (    
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <Card sx={{ width: '100%', height: '500px', pb: 4 }}>
      <CardMedia
        component="img"
        height="140"
        image={clubsDetailData.data.coverImage}
        alt="green iguana"
      />
    </Card>
    <Grid spacing={4} sx={{ pt:4, pl:4, pr:4, pb:4}} container>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" component="h4" sx={{pb:1}}>{ clubsDetailData.data.name}</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
      <Grid spacing={4} container>
        <Grid item xs={12} md={4}>

        </Grid>
        <Grid item xs={12} md={8}>
          { (userData !== null && userData.userRole !== undefined && userData.userRole === 'member' && userData.id !== clubsDetailData.data.admins  ? ( 
          <Button style={{ width: '100%' }} variant="contained" onClick={joinClub}>
            { (clubStatus.status && !clubStatus.request ? 'Joined' : (!clubStatus.status && clubStatus.request ? 'Requested' : 'Join' ) )}
          </Button>) :<Link to='./createevent' relative='path'><Button style={{ width: '100%' }} variant="contained">Create event</Button></Link> ) }

        </Grid>
      </Grid>

      </Grid>
    </Grid>
    <Divider />
    
      <Grid spacing={4} sx={{ pt:4, pl:4, pr:4}} container>
        <Grid item xs={12} md={8}>
        {(userData !== null && userData.userRole !== undefined && userData.userRole === 'member' && userData.id !== clubsDetailData.data.admins ? (
          <Grid container>
          <Grid item xs={12} md={12}>
            <AboutClub about={clubsDetailData.data.description} />
          </Grid>
          <Grid sx={{ pt:4 }} item xs={12} md={12}>
            {( events.length > 0 ? <UpcomingEvents events={events} /> : '')}
          </Grid>
        </Grid>
        
        ): (
          <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Events" value="1" />
                <Tab label="Members" value="2" />
                <Tab label="Badges" value="3" />
                <Tab label="About" value="4" />
                <Tab label="Reports" value="5" />
              </TabList>
            </Box>
            <TabPanel value="1">{( events.length > 0 ? <UpcomingEvents events={events} /> : '')}</TabPanel>
            <TabPanel value="2">
            <Grid spacing={4} sx={{ pt:2}} container>
              <Grid item xs={12} md={6}>
              <Typography variant="h6" component="h6" sx={{pb:1}}>Existing Members</Typography>
              <Demo>
                <List dense={dense}>
                {clubMembersData.data.map((item) => (
                  <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar alt={item.firstName} src={item.profileImage} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.firstName}
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
                ))}

                  </List>
                </Demo>
              </Grid>
              <Grid item xs={12} md={6}>
              <Typography variant="h6" component="h6" sx={{pb:1}}>Requests</Typography>
              </Grid>
            </Grid>
            </TabPanel>
            <TabPanel value="3">Badges</TabPanel>
            <TabPanel value="4"><AboutClub about={clubsDetailData.data.description} /></TabPanel>
            <TabPanel value="5">Badges</TabPanel>
          </TabContext>
        </Box>
        ))}
        </Grid>
        <Grid item xs={12} md={4}>
        <Grid container>
            <Grid sx={{ pb: 6}} item xs={12} md={12}>
              <Typography variant="h5" component="h5" sx={{pb:1}}>Admin</Typography>
                <List sx={{ width: '100%', backgroundColor: '#F3EFFB', padding: '15px 10px 15px 10px', borderRadius: '4%' }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={clubsDetailData.data.admins}
                    />
                  </ListItem>
                </List>
            </Grid>
            {(userData !== null && userData.userRole !== undefined && userData.userRole === 'member' && userData.id !== clubsDetailData.data.admins ? (
              <Grid item xs={12} md={12}>
              <Typography variant="h5" component="h5" sx={{pb:1}}>Members</Typography>
                <Box sx={{ backgroundColor: '#F3EFFB', padding: '35px 20px 35px 20px', borderRadius: '4%'}}>
                  <ImageList sx={{ width: 400, height: 150 }} cols={5} rowHeight={70}>
                    {clubMembersData.data.map((item) => (
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
            ): '')}

        </Grid>
        </Grid>
      </Grid>
    </Box>
);
};

export default ClubDetail;