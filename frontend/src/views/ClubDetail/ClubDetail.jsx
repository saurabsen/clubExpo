import  './clubdetail.css';
import { useState } from 'react';
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
      <Grid container>
        <Grid item xs={12}>
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
            <TabPanel value="about">
            <Grid container>
              <Grid item xs={8}>
              <Typography variant="h5" component="h5" sx={{pb:3}}>About the Club</Typography>
              <Typography variant="paragraph" component="paragraph">The Graphic Design club is a student-run organization that provides a creative outlet for students interested in graphic design. The club hosts workshops, guest speakers, and field trips related to graphic design. The club also hosts a portfolio night every semester, which provides an opportunity for students to showcase their work to peers and professionals. If you love playing with colors, shapes, and fonts, then the Graphic Design club is for you! We meet once a week to explore the world of graphic design and create projects that are both fun and educational. All skill levels are welcome, from beginners to experts. So come join us and let your creativity flow!</Typography>
              </Grid>
              <Grid item xs={4}>
              </Grid>
            </Grid>

            </TabPanel>
            <TabPanel value="reports">
            <Grid container sx={{ pb: 6}}>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardHeader
                      titleTypographyProps={{
                        fontSize: 16,
                        color: 'rgba(0, 0, 0, 0.6)'
                      }}
                      subheaderTypographyProps={{
                        fontSize: 32,
                        color: 'rgba(0, 0, 0, 0.87)'
                      }}
                      title="Total Events"
                      subheader="60"
                      sx={{ pl:16, pr:16, pt: 4, pb:4, borderBottom: '2px solid #ECECEC'}}
                    />
                  <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card variant="outlined">
                  <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card variant="outlined">
                <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
                </Card>
              </Grid>
            </Grid>
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Box>
);
};

export default ClubDetail;