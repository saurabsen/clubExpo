import React from 'react';
import { Button, Typography, Box, Avatar, Card, CardMedia } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ReactComponent as ShareSvg } from '../../assets/Icons/share.svg';

const ClubPage = (props) => {
  const { clubId } = props;
  const [clubInfo, setClubInfo] = useState();
  const [adminInfo, setAdminInfo] = useState();

  const getClub = async (id) => {
    const config = {
      method: 'get',
      url: `clubs/${id}`
    };
    const res = await axios(config);
    return res.data;
  };

  const getUser = async (userEmail) => {
    const data = JSON.stringify({
      email: userEmail
    });

    const config = {
      method: 'post',
      url: 'users/allusers',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    const res = await axios(config);
    return res.data[0];
  };

  const initThisPage = async () => {
    console.log('initThisPage called');
    setClubInfo(await getClub(clubId));
  };

  useEffect(() => {
    initThisPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(clubInfo);
    (async () => {
      setAdminInfo(await getUser(clubInfo.admins[0]));
    })();
  }, [clubInfo]);

  useEffect(() => {
    console.log(adminInfo);
  }, [adminInfo]);

  const renderClubHeader = () => {
    if (clubInfo) {
      return (
        <Card raised={false} sx={{ borderRadius: 'unset', boxShadow: 'unset' }}>
          <CardMedia
            component="img"
            height={'194px'}
            alt={`Cover image for ${clubInfo.name}`}
            image={clubInfo.coverImage}
          />
          <Avatar
            alt={`Club image for ${clubInfo.name}`}
            src={clubInfo.logoImage}
            variant="rounded"
            sx={{ height: 140, width: 140 }}
          />
          <Typography>{clubInfo.name}</Typography>
          <Box sx={{ display: 'flex', flexFlow: 'row', gap: 2 }}>
            <Button variant="outlined">
              <ShareSvg />
            </Button>
            <Button style={{ width: '100%' }} variant="contained">
              Join
            </Button>
          </Box>
        </Card>
      );
    }
  };

  const renderClubMain = () => {
    if (clubInfo && adminInfo) {
      return (
        <>
          <Box>
            <Typography>About club</Typography>
            <Typography>{clubInfo.description}</Typography>
          </Box>
          <Box>
            <Typography>Admin</Typography>
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexFlow: 'row',
                alignItems: 'center',
                gap: 1,
                boxShadow: 'unset',
                backgroundColor: '#F3EFFB'
              }}
            >
              <Avatar
                alt={`Admin's profile image}`}
                src={adminInfo.profileImage}
                variant="rounded"
                sx={{ height: 40, width: 40 }}
              />
              <Typography>{`${adminInfo.firstName} ${adminInfo.lastName}`}</Typography>
            </Card>
          </Box>
          <Box>
            <Typography>Members</Typography>
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexFlow: 'row',
                alignItems: 'center',
                gap: 1,
                boxShadow: 'unset',
                backgroundColor: '#F3EFFB'
              }}
            >
              <Avatar
                alt={`Admin's profile image}`}
                src={adminInfo.profileImage}
                variant="rounded"
                sx={{ height: 40, width: 40 }}
              />
              <Typography>{`${adminInfo.firstName} ${adminInfo.lastName}`}</Typography>
            </Card>
          </Box>
        </>
      );
    }
  };

  return (
    <>
      {renderClubHeader()}
      {renderClubMain()}
    </>
  );
};

export default ClubPage;
