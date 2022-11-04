import React from 'react';
import './createEvent.css';
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  TextField,
  RadioGroup,
  InputLabel,
} from '@mui/material'

const CreateEvent = () => {
  return (
    <>
    <div>CreateEvent</div>
    <Grid xs={12}>
      <Card>
        <CardMedia 
            component="img"
            height={"194px"}
            image={'https://picsum.photos/800/200'}
        />
      </Card>
    </Grid>
    </>
  );
};

export default CreateEvent;