import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from '../../components';
import { login, reset } from '../../features/auth/authSlice';
import './login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <section className='heading'>
        <h1>Login</h1>
        <p>Login and start creating clubs and events</p>
      </section>

      <section className='form'>
        <form onSubmit={handleOnSubmit}>
          <div className='form-group'>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email ID'
              onChange={handleOnChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={handleOnChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit'>Login</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
