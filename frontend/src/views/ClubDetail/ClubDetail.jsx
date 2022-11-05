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

export const data = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];


const ClubDetail = () => {
  const { getAllClubsData, getAllEventsData } = useActions();
  const clubsDetailData = useTypedSelector((state) => state.clubs);
  const clubEventsData = useTypedSelector((state) => state.events);
  const [value, setValue] = useState('events');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    getAllClubsData('63647188454e0daf972598b6');
    getAllEventsData('latestfromclubs',{  clubIds: ['63647188454e0daf972598b6'] });
    console.log(clubEventsData.data)
  },[]);
  return (    
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Grid container>
        <Grid item xs={12} md={8}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <AboutClub about={clubsDetailData.data.description} />
          </Grid>
          <Grid sx={{ pt:2 }} item xs={12} md={12}>
            <UpcomingEvents />
          </Grid>
        </Grid>
          
        </Grid>
        <Grid item xs={12} md={4}>

        </Grid>
      </Grid>
    </Box>
);
};

export default ClubDetail;