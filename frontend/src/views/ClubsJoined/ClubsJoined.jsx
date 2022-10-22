import './clubsjoined.css';
import SideBar from '../../components/Sidebar/SideBar';
import ClubCard from '../../components/ClubCard/ClubCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const ClubsJoined = () => {
  return (
    <>
    <div className="home">
      <div className="column-1">
        <SideBar userRole="member" />
      </div>

      <div className="" >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ p:2}}>
          <Grid item xs={4}>
            <ClubCard />
          </Grid>
          <Grid item xs={4}>
            <ClubCard />
          </Grid>
          <Grid item xs={4}>
            <ClubCard />
          </Grid>
          <Grid item xs={4}>
            <ClubCard />
          </Grid>
        </Grid>
      </Box>
      </div>
      
    </div>
    </>
  );
};

export default ClubsJoined;
