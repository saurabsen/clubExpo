import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ClubCard from '../../components/ClubCard/ClubCard';

const ClubsManaged = () => {
  const { getClubsDataByUser } = useActions();
  const clubs = useTypedSelector((state) => state.clubs);

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem('user'));
    getClubsDataByUser(userID._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ padding: '2rem 0' }}>
        <h3>Club Requests</h3>
        <br />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} sx={{ p: 2 }}>
            {clubs.data.map((clubData) => (
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
      </div>
    </>
  );
};

export default ClubsManaged;
