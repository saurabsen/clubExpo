/* eslint-disable no-unused-vars */
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
    featureImage: 'https://images.pexels.com/photos/3719037/pexels-photo-3719037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: `A Meet the HR Team event is a great way to introduce a company's Human Resources Department to the rest of the organization. This is also an opportunity learn about the company's policies and procedures, and answer any questions that employees may have.`,
    startDate: '2022-12-21T10:00',
    endDate: '2022-12-21T10:00',
    attendees: [],
    availableSpots: 30,
    type: 'Online',
    location: 'Zoom',
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
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            sx={{height: { xs: '97px', md: '231px' }}}
            image={'https://picsum.photos/id/910/800/200'}
          />
          <Box
            onClick={() => navigate(-1)}
            sx={{ position: 'absolute', top: '30px', left: '30px' }}
          >
            <BackButton />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'center', pt: '40px' }}>
          <Box
            component="form"
            onSubmit={onSubmitHandler}
            sx={{
              px: '16px',
              '& > *': { mb: '24px' },
              flexGrow: '1',
              maxWidth: '669px'
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
                  value='2022-12-21T10:00'
                />
              </FormControl>
            </Card>
            <Card sx={cardStyle}>
              <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label" sx={{ color: 'black' }}>
                  <h5>Location</h5>
                </FormLabel>
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
                  <Input id="formLinkOrAddress" onChange={onChangeHandler} name="location" value='Zoom' />
                </FormControl>
              </FormControl>
            </Card>
            <Card sx={cardStyle}>
              <h5>Event description</h5>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="formEventDescription">Describe your event</InputLabel>
                <Input id="formEventDescription" onChange={onChangeHandler} name="description" value={`A Meet the HR Team event is a great way to introduce a company's Human Resources Department to the rest of the organization. This is also an opportunity learn about the company's policies and procedures, and answer any questions that employees may have.`} />
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
                  value='30'
                />
              </FormControl>
            </Card>
            <Card sx={cardStyle}>
              <FormControl>
                <FormLabel id="formEventPriceType" sx={{ color: 'black' }}>
                  <h5>Type of event</h5>
                </FormLabel>
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
                  value={`https://picsum.photos/id/1006/600/600`}
                />
              </FormControl>
            </Card>
            <Box sx={{ display: 'flex', gap: '20px', mt: '40px', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={() => navigate(-1)} sx={buttonStyle}>
                Exit
              </Button>
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
