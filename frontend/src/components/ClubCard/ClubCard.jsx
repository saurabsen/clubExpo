import './clubcard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ClubCard = ({
  clubImage="https://picsum.photos/id/237/200/300",
  clubName="Placeholder",
  clubNumMembers=0
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={clubImage}
        alt={`Feature image for club ${clubName}`}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {clubName}
        </Typography>
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
