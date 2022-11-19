import { useEffect } from 'react';
import './discoverclubs.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ClubCard from '../../components/ClubCard/ClubCard';
import Typography from '@mui/material/Typography';

const DiscoverClubs = () => {
  const { getAllClubsData } = useActions();
  const allDiscoverClubsData = useTypedSelector((state) => state.clubs);

  useEffect(() => {
    getAllClubsData('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={12} sx={{ p: 2 }}>
          <h3>Discover Clubs</h3>
        </Grid>
        <Grid container spacing={1} sx={{ p: 2 }}>
          {allDiscoverClubsData.data != null && allDiscoverClubsData.data.length > 0 ? (
            allDiscoverClubsData.data.map((clubData) => (
              <Grid key={clubData.createdAt} item xs={12} md={4}>
                <ClubCard
                  key={clubData._id}
                  clubImage={clubData.logoImage}
                  clubName={clubData.name}
                  clubNumMembers={clubData?.acceptedMembers?.length}
                  clubId={clubData._id}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography
                gutterBottom
                component="div"
                sx={{ color: '#676F66', fontWeight: 500, fontSize: '16px' }}
              >
                {'Adding Clubs soon!'}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default DiscoverClubs;
