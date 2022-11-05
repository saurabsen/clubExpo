import { useEffect } from 'react';
import './discoverclubs.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ClubCard from '../../components/ClubCard/ClubCard';

const DiscoverClubs = () => {
  const { getAllClubsData } = useActions();
  const allDiscoverClubsData = useTypedSelector((state) => state.clubs);

  useEffect(() => {
    getAllClubsData('');
  },[]);
  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ p:2}}>
        { allDiscoverClubsData.data.map(clubData => (
          <Grid key={clubData.createdAt} item xs={4}>
          <ClubCard
            key={clubData._id}
            clubImage={clubData.logoImage}
            clubName={clubData.name}
            clubNumMembers={clubData.acceptedMembers.length}
            clubId={clubData._id}
          />
        </Grid>
        ))}
        </Grid>
      </Box>
    </>
  );
};

export default DiscoverClubs;
