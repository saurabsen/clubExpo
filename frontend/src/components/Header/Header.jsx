import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handeOnLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Clubspace</Link>
      </div>
      <ul className='authButtons'>
        {user ? (
          <li>
            <button onClick={handeOnLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <button>Login</button>
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <button>Register</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
