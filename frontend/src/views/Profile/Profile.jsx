import * as React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Box, Card, Tabs, Tab, Typography, CardMedia } from '@mui/material';
import { useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { BackButton } from '../../components';
import { profileCover } from '../../assets';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '../../components/Button/Button';
import { purple } from '@mui/material/colors';
import { twitter, instagram, email } from '../../assets';

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

const Profile = () => {
  const [value, setValue] = React.useState(0);
  const [userClubs, setUserClubs] = React.useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { data: userData } = useTypedSelector((state) => state.auth);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getClubs();
  }, []);

  const getClubs = async () => {
    const data = await axios.get(`clubs/`);

    if (data) {
      const userClubs = data.data.filter((club) => club.createdBy === userData._id);
      setUserClubs(userClubs);
    }
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: purple[500],
        width: 100,
        height: 100
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
  };

  return (
    <>
      <Box sx={{ position: 'relative' }} className="card-img">
        <CardMedia component="img" height={{ xs: '194px', md: '462px' }} image={profileCover} />
        <Box onClick={() => navigate(-1)} sx={{ position: 'absolute', top: '30px', left: '30px' }}>
          <BackButton />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'center',
          pt: '40px',
          background: '#FBFCFF'
        }}
      ></Box>
      <Box sx={{ maxWidth: '100%', padding: '2rem' }}>
        <Stack direction="row" spacing={2} sx={{ mt: -8, justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2}>
            <Avatar
              {...stringAvatar(`${userData.firstName} ${userData.lastName}`)}
              sx={{ bgcolor: purple[500], width: 100, height: 100, mt: -5 }}
              src={userData.profileImage}
              variant="rounded"
            ></Avatar>
            <h2>
              {userData.firstName} {userData.lastName}
            </h2>
          </Stack>
          <Button type="outline" innerText="Edit Profile">
            Edit Profile
          </Button>
        </Stack>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
            <Tab label="About" {...a11yProps(0)} />
            <Tab label="Clubs" {...a11yProps(1)} />
            {/* <Tab label="Badges" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <h4>Bio</h4>
          {userData.description}
          <br />
          <br />
          <br />
          <h4>Social media</h4>
          <br />
          <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
            <img src={instagram} style={{ width: '30px' }} alt="Notification Bell Off" />@
            {userData.firstName}
            {userData.lastName}
          </div>
          <br />
          <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
            <img src={twitter} style={{ width: '30px' }} alt="Notification Bell Off" />
            {userData.firstName}.{userData.lastName} &nbsp; &nbsp;
          </div>
          <br />
          <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
            <img src={email} style={{ width: '30px' }} alt="Notification Bell Off" />
            {userData.firstName}.{userData.lastName}@gmail.com
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            {userClubs.map((club) => {
              return (
                <Card sx={{ padding: '1rem', width: '300px' }} variant="outlined">
                  <h4>{club.name}</h4>
                  <br />
                  <p>{club.description}</p>
                </Card>
              );
            })}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Badges section
        </TabPanel>
      </Box>
    </>
  );
};

export default Profile;
