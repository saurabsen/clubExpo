import  './clubdetail.css';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Chart } from "react-google-charts";
import Card from '@mui/material/Card';

export const data = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];


const ClubDetail = () => {
  const [value, setValue] = useState('events');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (    
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Events" value="events" />
            <Tab label="Members" value="members" />
            <Tab label="Badges" value="badges" />
            <Tab label="About" value="about" />
            <Tab label="Reports" value="reports" />
          </TabList>
        </Box>
        <TabPanel value="events">Events</TabPanel>
        <TabPanel value="members">Members</TabPanel>
        <TabPanel value="badges">Badges</TabPanel>
        <TabPanel value="about">About</TabPanel>
        <TabPanel value="reports">
          <Card variant="outlined">
            <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
          </Card>
        </TabPanel>
      </TabContext>
    </Box>
);
};

export default ClubDetail;