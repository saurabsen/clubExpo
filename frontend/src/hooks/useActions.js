import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { eventsActions, clubsActions, proposalActions, authActions } from '../state';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    Object.assign({}, eventsActions, clubsActions, proposalActions, authActions),
    dispatch
  );
};
