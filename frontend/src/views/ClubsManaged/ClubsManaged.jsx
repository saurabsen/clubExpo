import { useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
import { useActions } from '../../hooks/useActions';
// import { useTypedSelector } from '../../hooks/useTypedSelector';
// import ClubCard from '../../components/ClubCard/ClubCard';

const ClubsManaged = () => {
  const { getAllClubsData } = useActions();
  // const allDiscoverClubsData = useTypedSelector((state) => state.clubs);

  useEffect(() => {
    getAllClubsData('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default ClubsManaged;
