import {
  HomeIcon,
  Discover,
  ClubsJoined,
  EventRegistered,
  ClubsManaged,
  Dashboard,
  Request
} from '../../assets';
import './sidebar.css';

const SideBar = ({ userRole }) => {
  return (
    <div className="sidebar">
      <ul>
        {userRole === 'clubAdmin' ? (
          <>
            <li>
              <img src={HomeIcon} alt="Home Icon" /> Home
            </li>
            <li>
              <img src={Discover} alt="Discover Clubs Icon" /> Discover Clubs
            </li>
            <li>
              <img src={ClubsJoined} alt="Clubs Joined Icon" /> Clubs Joined
            </li>
            <li>
              <img src={ClubsManaged} alt="Clubs Managed Icon" /> Clubs Managed
            </li>
            <li>
              <img src={EventRegistered} alt="Events Registered Icon" /> Events Registered
            </li>
          </>
        ) : userRole === 'hubAdmin' ? (
          <>
            <li>
              <img src={Dashboard} alt="Dashboard Icon" /> Dashboard
            </li>
            <li>
              <img src={ClubsManaged} alt="All Clubs Icon" /> All Clubs
            </li>
            <li>
              <img src={Request} alt="Club Requests Icon" /> Club Requests
            </li>
          </>
        ) : (
          <>
            <li className="active-menu">
              <img src={HomeIcon} alt="Home Icon" /> Home
            </li>
            <li>
              <img src={Discover} alt="Discover Clubs Icon" /> Discover Clubs
            </li>
            <li>
              <img src={ClubsJoined} alt="Clubs Joined Icon" /> Clubs Joined
            </li>
            <li>
              <img src={EventRegistered} alt="Events Registered Icon" /> Events Registered
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
