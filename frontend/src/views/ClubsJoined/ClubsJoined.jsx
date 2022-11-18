import { useEffect } from 'react';
import './clubsjoined.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ClubCard from '../../components/ClubCard/ClubCard';

const ClubsJoined = () => {
  const { getAllClubsData } = useActions();
  const clubsJoinedData = useTypedSelector((state) => state.clubs);
  const {data:userData} = useTypedSelector((state) => state.auth);
  useEffect(() => {
    if(userData!== null && Object.keys(userData).length > 0)
    getAllClubsData(`members/${userData._id}`);
  }, [userData]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} sx={{ p: 2 }}>
          <Grid item xs={12} md={12}>
          <h3>Clubs Joined</h3> 
          </Grid>
          {clubsJoinedData.data !== null && 
            clubsJoinedData.data !== undefined && 
            clubsJoinedData.data.length > 0   && 
            clubsJoinedData.data!== undefined ? (
              clubsJoinedData.data
              .map((clubData) => (
                <Grid key={clubData.createdAt} item xs={12} md={4}>
                  <ClubCard
                    key={clubData._id}
                    clubImage={clubData.logoImage}
                    clubName={clubData.name}
                    clubNumMembers={clubData?.acceptedMembers?.length}
                    clubId={clubData._id}
                  />
                </Grid>
              ) )
            ) : !clubsJoinedData.loading ?  (
              <Grid item xs={12} style={{display: "flex", justifyContent: "center"}}>
                <Typography gutterBottom component="div" sx={{color: '#676F66', fontWeight: 500, fontSize: '16px'}}>
                  {'Looks like you haven’t joined any clubs. Try joining clubs from discover clubs section.'}
                </Typography>
                <Button variant="contained">
                    {'Discover Clubs'}
                </Button>
              </Grid>
            ) : ('')}
        </Grid>
      </Box>
    </>
  );
};

export default ClubsJoined;
