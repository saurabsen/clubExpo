import { Grid, TextField, Button, Box } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser({ email, password }).then((resp) => {
      if (resp)
        resp.userRole.includes('hubAdmin') ? navigate('/admin-dashboard') : navigate('/home');
    });
  };

  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        md={4}
        flexDirection="column"
        gap="2rem"
        sx={{ alignSelf: 'center', padding: '0 4rem', height: {xs: '60vh', md: '100vh'}, order: 1}}
      >
        <Box sx={{display: 'flex', alignItems: 'center', height: '100%', width: '100%'}}>
          <Box sx={{width: '100%'}}>
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
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={8} sx={{height: {xs: '30vh', md: '100vh'}, order: {xs: 0, md: 2}}}>
        <Box sx={{
          backgroundImage: `url(${LoginGirl})`, 
          height: '100%', 
          width: '100%', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center center'
        }}>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
