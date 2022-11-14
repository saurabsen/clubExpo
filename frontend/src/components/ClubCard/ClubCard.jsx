import './clubcard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const ClubCard = (props) => {
  let {clubImage, clubName, clubNumMembers, clubId} = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="50"
        sx={{height: '270px'}}
        image={clubImage}
        alt={`Feature image for club ${clubName}`}
      />
      <CardContent>
        <Link to={`/clubs/${clubId}`}>
          <Typography variant="h5" component="div">
            {clubName}
          </Typography>
        </Link>
      </CardContent>
      <CardActions>
        <Typography gutterBottom component="div" sx={{pl:1}}>
          {clubNumMembers} {clubNumMembers !== 1 ? "members" : "member"}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default ClubCard;
