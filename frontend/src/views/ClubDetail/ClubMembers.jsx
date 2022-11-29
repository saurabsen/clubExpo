import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

const ClubMembers = (props) => {
  const { item, userData } = props;
  return (
    <>
      <ListItem
        sx={{ border: '1px solid #E0E2E0', pb: 2 }}
        secondaryAction={
          userData !== null &&
          userData.userRole !== undefined &&
          userData.userRole.includes('clubAdmin') &&
          item.request ? (
            <>
              <Button
                type="invertedfill"
                edge="end"
                aria-label="delete"
                sx={{
                  color: 'hsla(263, 73%, 43%, 1)',
                  backgroundColor: 'hsla(260, 60%, 96%, 1)'
                }}
                onClick={() => props.addClubMember(item._id)}
              >
                Approve
              </Button>
              {/* <IconButton onClick={() => props.addClubMember(item._id)}  edge="end" aria-label="delete">
                <ArrowCircleRightOutlined sx={{color: '#5D1EBF'}}  />
              </IconButton> */}
              <IconButton
                onClick={() => props.deleteClubUser(item._id)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon sx={{ color: '#AA1D13' }} />
              </IconButton>
            </>
          ) : userData !== null &&
            userData.userRole !== undefined &&
            userData.userRole.includes('clubAdmin') &&
            item.status ? (
            <IconButton
              onClick={() => props.deleteClubUser(item._id)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: '#AA1D13' }} />
            </IconButton>
          ) : (
            ''
          )
        }
      >
        <ListItemAvatar sx={{ pt: 1, pb: 1 }}>
          <Avatar sx={{ border: '8px' }} alt={item.firstName} src={item.profileImage} />
        </ListItemAvatar>
        <ListItemText primary={item.firstName} />
      </ListItem>
    </>
  );
};

export default ClubMembers;
