import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from '../../components';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <div className='container'>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Create clubs and events 🎊</p>
      </section>
    </div>
  );
};

export default Home;
