import * as React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Box, Card, Tabs, Tab, Typography } from '@mui/material';
import { useEffect } from 'react';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getClubs();
  });

  const getClubs = async () => {
    const token = JSON.parse(localStorage.getItem('userToken'));
    const user = JSON.parse(localStorage.getItem('user'));

    const data = await axios.get(`http://localhost:3001/api/clubs/`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (data) {
      const userClubs = data.data.filter((club) => club.createdBy === user._id);
      setUserClubs(userClubs);
    }
  };

  return (
    <Box sx={{ width: '1400px', padding: '2rem 0' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Clubs" {...a11yProps(1)} />
          <Tab label="Badges" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        About section
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
  );
};

export default Profile;