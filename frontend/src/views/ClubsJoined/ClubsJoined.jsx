import { useEffect } from 'react';
import './clubsjoined.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ClubCard from '../../components/ClubCard/ClubCard';

const ClubsJoined = () => {
  const { getAllClubsData } = useActions();
  const clubsJoinedData = useTypedSelector((state) => state.clubs);
  const userData = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    getAllClubsData('');
  },[]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ p: 2 }}>
        { clubsJoinedData.data.filter(clubData => clubData.acceptedMembers.find( membersData => membersData.id === userData._id )).map(clubData => (
          <Grid key={clubData.createdAt} item xs={4}>
            <ClubCard
              key={clubData._id}
              clubImage={clubData.logoImage}
              clubName={clubData.name}
              clubNumMembers={clubData?.acceptedMembers?.length}
              clubId={clubData._id}
            />
        </Grid>
        ))}
        </Grid>
      </Box>
    </>
  );
};

export default ClubsJoined;
