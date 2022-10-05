import { useState, useEffect } from 'react';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmedPassword: '',
  });

  const { name, email, password, confirmedPassword } = formData;

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
    </>
  );
};

export default Register;
