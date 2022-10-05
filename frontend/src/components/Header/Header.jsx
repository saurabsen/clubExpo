import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Clubspace</Link>
      </div>
      <ul className='authButtons'>
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
      </ul>
    </header>
  );
};

export default Header;
