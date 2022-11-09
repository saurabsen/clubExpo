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
    debugger;
    const userID = JSON.parse(localStorage.getItem('user'));
    getClubsDataByUser(userID._id);
    console.log(clubs, 'data');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
    </>
  );
};

export default ClubsManaged;
