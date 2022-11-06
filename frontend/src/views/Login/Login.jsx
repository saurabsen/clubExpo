import { Grid, TextField, Button, Box } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginGirl } from '../../assets';
import { useActions } from '../../hooks/useActions';
// import { useTypedSelector } from '../../hooks/useTypedSelector';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const { loginUser } = useActions();

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  return (
    <Grid container>
      <Grid
        container
        item
        xs={6}
        flexDirection="column"
        gap="2rem"
        sx={{ padding: '16rem 22rem 0 4rem' }}
      >
        <h1>Login</h1>
        <form onSubmit={onSubmitHandler}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem'
            }}
          >
            <TextField
              required
              id="standard-required"
              label="Email"
              variant="standard"
              name="email"
              value={email}
              onChange={onChangeHandler}
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              name="password"
              value={password}
              onChange={onChangeHandler}
            />
            <p style={{ fontWeight: 'bold', margin: '1rem 0' }}>
              <Link to="#">Forgot password?</Link>
            </p>
          </Box>
          <Button
            sx={{
              backgroundColor: '#5D1EBF',
              padding: '16px 36px 16px 36px',
              '&:hover': {
                backgroundColor: '#5D1EBF'
              }
            }}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Grid>
      <Grid item xs={6}>
        <img src={LoginGirl} alt="Login Page Girl" />
      </Grid>
    </Grid>
  );
}

export default Login;
