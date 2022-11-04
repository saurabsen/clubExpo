import { useEffect } from 'react';
import './discoverclubs.css';
import ClubCard from '../../components/ClubCard/ClubCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import axios from 'axios';
import { useState } from 'react';



const DiscoverClubs = () => {
  const { getAllClubsData } = useActions();
  const allDiscoverClubsData = useTypedSelector((state) => state.clubs);
  const [clubList, setClubList] = useState();

  const getClubs = async () => {
    const config = {
      method: 'get',
      url: 'http://localhost:3001/api/clubs/',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzU5YWQ0MmJkMzgzNzljYTNkMzViZDAiLCJpYXQiOjE2NjY4MjE0NDIsImV4cCI6MTY2OTQxMzQ0Mn0._SaFCeAaa-BQVmC-tGPcczEcoad_3XOfONKzMFqeqRY'
      }
    };
    const res = await axios(config);
    return res.data;
  };



  useEffect(() => {
    (async () => {
      const clubsInfo = await getClubs();
      setClubList(clubsInfo);
    })();
    getAllClubsData('');
    console.log(allDiscoverClubsData);
  },[]);

  useEffect(() => {
    console.log(clubList);
  }, [clubList]);

  const renderClubCards = () => {
    let clubElems = [];
    if (clubList) {
      clubList.forEach(club => {
        clubElems.push(
          <Grid item xs={4}>
            <ClubCard
              clubImage={club.logoImage}
              clubName={club.name}
              clubNumMembers={club.acceptedMembers.length}
              clubId={club._id}
            />
          </Grid>
    );});}
    return clubElems;
  };

  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ p:2}}>
          {renderClubCards(clubList)}
        </Grid>
      </Box>
    </>
  );
};

export default DiscoverClubs;
