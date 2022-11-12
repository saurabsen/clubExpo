import React from 'react';
import './createEvent.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardMedia,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  TextField,
  RadioGroup,
  InputLabel,
  Input,
  FormLabel,
  Radio,
  Button
} from '@mui/material';
import { BackButton } from '../../components';

const CreateEvent = (props) => {
  const { clubId } = props;
  const sanitizedToken = localStorage.userToken.replaceAll('"', '');
  const userObj = JSON.parse(localStorage.user);
  const navigate = useNavigate();

  const eventModel = {
    name: '',
    featureImage: 'https://picsum.photos/id/1006/600/600',
    description: '',
    startDate: JSON.stringify(new Date()),
    endDate: JSON.stringify(new Date()),
    attendees: [],
    availableSpots: 0,
    type: 'Online',
    location: '',
    clubId: clubId,
    createdByAdmin: userObj._id,
    contact: '1234'
  };
  const [formData, setFormData] = useState(eventModel);

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      endDate: prevState.startDate
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, availableSpots: parseInt(formData.availableSpots) });
    const config = {
      method: 'post',
      url: 'events/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sanitizedToken
      },
      data: formData
    };
    try {
      const res = await axios(config);
      navigate('/events/' + res.data._id);
    } catch (error) {
      alert('Check fields for missing values');
      console.log(error);
    }
  };

  const cardStyle = {
    border: '1px solid #E0E2E0',
    boxShadow: 'unset',
    py: '16px',
    px: '24px',
    pb: '26px',
    '& .MuiFormControl-root': {
      mt: '12px'
    },
    '& .MuiFormGroup-root': {
      mt: '12px'
    }
  };

  const buttonStyle = {
    // py: '16px',
    fontSize: '16px',
    flexGrow: '1',
    maxWidth: '190px'
  };

  return (
    <>
      <Card>
        <Box sx={{position: 'relative'}}>
          <CardMedia
            component="img"
            height={{xs: '194px', md: '462px'}}
            image={'https://picsum.photos/id/910/800/200'}
          />
          <Box onClick={() => navigate(-1)} sx={{position: 'absolute', top: '30px', left: '30px'}}>
            <BackButton />
          </Box>
        </Box>
        <Box sx={{display: 'flex', flexFlow: 'row', justifyContent: 'center', pt: '40px'}}>
          <Box
            component="form"
            onSubmit={onSubmitHandler}
            sx={{
              px: '16px',
              '& > *': {mb: '24px'},
              flexGrow: '1',
              maxWidth: '669px',
            }}
            noValidate
            autoComplete="off"
          >
            <h3>Create Event</h3>
            <Card sx={cardStyle}>
              <h5>Event name</h5>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="formEventName">Enter event name</InputLabel>
                <Input required id="formEventName" onChange={onChangeHandler} name="name" />
              </FormControl>
            </Card>
            <Card sx={cardStyle}>
              <h5>Select date and time</h5>
              <FormControl variant="standard">
                <TextField
                  required
                  id="formEventDateTime"
                  variant="standard"
                  type="datetime-local"
                  name="startDate"
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={onChangeHandler}
                />
              </FormControl>
            </Card>
            <Card sx={cardStyle}>
              <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label" sx={{color: 'black'}}><h5>Location</h5></FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Online"
                  name="type"
                  onChange={onChangeHandler}
                >
                  <FormControlLabel value="Online" control={<Radio />} label="Online" />
                  <FormControlLabel value="Venue" control={<Radio />} label="Venue" />
                </RadioGroup>
                <FormControl variant="standard">
                  <InputLabel htmlFor="formLinkOrAddress">Platform or Address</InputLabel>
                  <Input id="formLinkOrAddress" onChange={onChangeHandler} name="location" />
                </FormControl>
              </FormControl>
            </Card>
            <Card sx={cardStyle}>
              <h5>Event description</h5>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="formEventDescription">Describe your event</InputLabel>
                <Input id="formEventDescription" onChange={onChangeHandler} name="description" />
              </FormControl>
            </Card>
            <Card sx={cardStyle}>
              <h5>Max attendees</h5>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="formMaxAttendees">How many people can attend</InputLabel>
                <Input
                  id="formMaxAttendees"
                  onChange={onChangeHandler}
                  name="availableSpots"
                  type="number"
                />
              </FormControl>
            </Card>
            <Card sx={cardStyle}>
              <FormControl>
                <FormLabel id="formEventPriceType" sx={{color: 'black'}}><h5>Type of event</h5></FormLabel>
                <RadioGroup
                  aria-labelledby="formEventPriceType"
                  defaultValue="free"
                  name="eventPriceType"
                  onChange={onChangeHandler}
                >
                  <FormControlLabel value="free" control={<Radio />} label="Free" />
                  <FormControlLabel value="paid" control={<Radio />} label="Paid" />
                </RadioGroup>
              </FormControl>
            </Card>
            <Card sx={cardStyle}>
              <h5>Image URL</h5>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="formEventImageURL">Add URL to Image</InputLabel>
                <Input
                  id="formEventImageURL"
                  onChange={onChangeHandler}
                  name="featureImage"
                  value="https://picsum.photos/id/1006/600/600"
                />
              </FormControl>
            </Card>
            <Box sx={{ display: 'flex', gap: '20px', mt: '40px', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={() => navigate(-1)} sx={buttonStyle}>Exit</Button>
              <Button variant="contained" type="submit" sx={buttonStyle}>
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CreateEvent;
