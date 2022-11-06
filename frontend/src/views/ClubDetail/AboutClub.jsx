import { Typography } from '@mui/material';

const AboutClub = (props) => {
  return (
    <>
      <Typography variant="h5" component="h5" sx={{ pb: 2 }}>
        About the Club
      </Typography>
      <Typography variant="p" component="p">
        {props.about}
      </Typography>
    </>
  );
};

export default AboutClub;
