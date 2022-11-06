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
    console.log(formData);
    setFormData({ ...formData, availableSpots: parseInt(formData.availableSpots) });
    const config = {
      method: 'post',
      url: 'http://localhost:3001/api/events/',
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

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height={'194px'}
          image={'https://picsum.photos/id/910/800/200'}
        />
        <Typography variant="h4">Create Event</Typography>
        <Box
          component="form"
          onSubmit={onSubmitHandler}
          sx={{
            '& > :not(style)': { m: 1 }
          }}
          noValidate
          autoComplete="off"
        >
          <Typography>Event name</Typography>
          <FormControl variant="standard">
            <InputLabel htmlFor="formEventName">Enter event name</InputLabel>
            <Input required id="formEventName" onChange={onChangeHandler} name="name" />
          </FormControl>

          <Typography>Select date and time</Typography>

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

          <Typography></Typography>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Location</FormLabel>
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

          <Typography>Event description</Typography>
          <FormControl variant="standard">
            <InputLabel htmlFor="formEventDescription">Describe your event</InputLabel>
            <Input id="formEventDescription" onChange={onChangeHandler} name="description" />
          </FormControl>

          <Typography>Max attendees</Typography>
          <FormControl variant="standard">
            <InputLabel htmlFor="formMaxAttendees">How many people can attend</InputLabel>
            <Input
              id="formMaxAttendees"
              onChange={onChangeHandler}
              name="availableSpots"
              type="number"
            />
          </FormControl>

          <Typography></Typography>
          <FormControl>
            <FormLabel id="formEventPriceType">Type of event</FormLabel>
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

          <Typography>Image URL</Typography>
          <FormControl variant="standard">
            <InputLabel htmlFor="formEventImageURL">Add URL to Image</InputLabel>
            <Input
              id="formEventImageURL"
              onChange={onChangeHandler}
              name="featureImage"
              value="https://picsum.photos/id/1006/600/600"
            />
          </FormControl>
          <Box sx={{ display: 'flex', gap: '50px' }}>
            <Link to="/home">
              <Button variant="outlined">Exit</Button>
            </Link>
            <Button variant="contained" type="submit">
              Create
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CreateEvent;
