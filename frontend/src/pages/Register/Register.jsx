import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from '../../components';
import { register, reset } from '../../features/auth/authSlice';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmedPassword: '',
  });

  const { name, email, password, confirmedPassword } = formData;

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

    if (password !== confirmedPassword) {
      toast.error('Passwords do not match.');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <section className='heading'>
        <h1>Register</h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={handleOnSubmit}>
          <div className='form-group'>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={handleOnChange}
            />
          </div>
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
            <input
              type='password'
              id='confirmedPassword'
              name='confirmedPassword'
              value={confirmedPassword}
              placeholder='Confirm password'
              onChange={handleOnChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit'>Register</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
