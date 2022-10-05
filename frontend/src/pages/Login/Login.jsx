import { useState, useEffect } from 'react';
import './login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
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
            <button type='submit'>Register</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
