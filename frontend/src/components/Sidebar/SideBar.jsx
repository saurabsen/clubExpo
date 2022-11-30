import { Box } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import './sidebar.css';
import Divider from '@mui/material/Divider';
import { LogoRectangle } from '../../assets';

const SideBar = (props) => {
  return (
    <Box className="sidebar">
      <Link to="/home" style={{ paddingLeft: '28px' }}>
        <img src={LogoRectangle} style={{ width: '130px' }} alt="Clubspace Logo" />
      </Link>
      <Divider sx={{pt: '11px', mr: '-10px'}}/>
      <ul>
        {props.sidebardata.map((sidebar) => (
          <NavLink
            key={sidebar.routeLink}
            to={sidebar.routeLink}
            end
            className={({ isActive }) => (isActive ? 'active-menu' : '')}
          >
            <li>
              <img src={sidebar.icon} alt={sidebar.altText} /> {sidebar.name}
            </li>
          </NavLink>
        ))}
      </ul>
    </Box>
  );
};

export default SideBar;
