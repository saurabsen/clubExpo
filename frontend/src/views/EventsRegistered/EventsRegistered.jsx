import { useEffect } from 'react';
import './eventsregistered.css';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
import { useActions } from '../../hooks/useActions';
// import { useTypedSelector } from '../../hooks/useTypedSelector';
// import EventsCard from '../../components/EventsCard/EventsCard';

const EventsRegistered = () => {
  const { getAllEventsData } = useActions();
  // const allEventsData = useTypedSelector((state) => state.events);
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getAllEventsData('latestfromclubs', { clubIds: userData.clubsJoined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>{}</h1>
    </>
  );
};

export default EventsRegistered;
