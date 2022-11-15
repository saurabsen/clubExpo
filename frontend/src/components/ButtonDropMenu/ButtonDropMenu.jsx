import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '../Button/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus(props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate(`/events/${props.eventId}`);
  };

  const dropMenuStyling = {
    fontFamily: "Raleway",
    fontWeight: 500,
    fontSize: 16,
    '&:hover': {
      color: "hsla(263, 73%, 43%, 1)",
      backgroundColor: "hsla(260, 60%, 96%, 1)",
    }
  };

  return (
    <div className='button standardui-buttondropmenu'>
      <Button 
        type='invertedfill'
        innerText='Registered'
        isIcon={true}
        iconType='downarrow'
        clickHandler={handleClick}
      />
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple sx={dropMenuStyling}>
          Registered
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple sx={dropMenuStyling}>
          Not Interested
        </MenuItem>
      </StyledMenu>
    </div>
  );
}