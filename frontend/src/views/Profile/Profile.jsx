import * as React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Box, Card, Tabs, Tab, Typography } from '@mui/material';
import { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

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
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getClubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClubs = async () => {
    const data = await axios.get(`clubs/`);

    if (data) {
      const userClubs = data.data.filter((club) => club.createdBy === user._id);
      setUserClubs(userClubs);
    }
  };

  return (
    <Box sx={{ width: '1400px', padding: '2rem 0' }}>
      {user.firstName}&nsbp;
      {user.lastName}
      <Button onClick={handleOpen}>Edit Profile</Button>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default Profile;
