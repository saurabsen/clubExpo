import './clubcard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ClubCard = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://picsum.photos/id/237/200/300"
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          Club 1
        </Typography>
      </CardContent>
      <CardActions>
        <Typography gutterBottom component="div" sx={{pl:1}}>
          20 members
        </Typography>
      </CardActions>
    </Card>
  );
};

export default ClubCard;
