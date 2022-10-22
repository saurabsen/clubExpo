import SideBar from '../../components/Sidebar/SideBar';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="column-1">
        <SideBar userRole="member" />
      </div>

      <div className="column-2">Events Cards</div>

      <div className="column-3">
        <div>Upcoming Events</div>
        <div>Calender</div>
      </div>
    </div>
  );
};

export default Home;
