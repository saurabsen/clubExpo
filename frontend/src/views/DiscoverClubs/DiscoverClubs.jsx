import { useEffect } from 'react';
import './discoverclubs.css';
import ClubCard from '../../components/ClubCard/ClubCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';



const DiscoverClubs = () => {
  const { getAllClubsData } = useActions();
  const allDiscoverClubsData = useTypedSelector((state) => state.clubs);

  useEffect(() => {
    getAllClubsData('');
    console.log(allDiscoverClubsData);
  },[]);
  return (
    <>
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
        </Grid>
      </Box>
    </>
  );
};

export default DiscoverClubs;
