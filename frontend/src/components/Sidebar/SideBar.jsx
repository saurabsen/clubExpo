import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const SideBar = (props) => {
  return (
    <Box className="sidebar">
      <ul>
        {
          props.sidebardata.map(sidebar=>(
            <NavLink key={sidebar.routeLink} to={sidebar.routeLink} end className={({ isActive }) => (isActive ? 'active-menu' : '')}>
              <li>
                <img src={sidebar.icon} alt={sidebar.altText} /> {sidebar.name}
              </li>
            </NavLink>
          ))
        }
      </ul>
    </Box>
  );
};

export default SideBar;
