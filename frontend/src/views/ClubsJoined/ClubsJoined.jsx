/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import './clubsjoined.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ClubCard from '../../components/ClubCard/ClubCard';
import { useNavigate } from 'react-router-dom';

const ClubsJoined = () => {
  const { getAllClubsData } = useActions();
  const clubsJoinedData = useTypedSelector((state) => state.clubs);
  const { data: userData } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData !== null && Object.keys(userData).length > 0)
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
          clubsJoinedData.data.length > 0 ? (
            clubsJoinedData.data.map((clubData) => (
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
          ) : !clubsJoinedData.loading ? (
            <Grid item xs={12} md={12}>
              <Box sx={{ textAlign: 'center' }}>
                <br />
                <Typography sx={{ color: '#808780', fontFamily: 'Raleway, sans-serif' }}>
                  Looks like you haven't joined any clubs. Try joining clubs <br />
                  to see events happening.
                </Typography>
                <br />
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate('/discover-clubs');
                  }}
                  sx={{
                    fontSize: '16px',
                    px: '40px',
                    py: '16px',
                    borderRadius: '8px',
                    boxShadow: 'unset'
                  }}
                >
                  Discover clubs
                </Button>
              </Box>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ClubsJoined;
