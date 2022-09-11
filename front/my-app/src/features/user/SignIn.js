import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch, useSelector } from "react-redux";
import { selectIs_active, selectIs_staff, selectIs_superuser, doLoginAsync, selectlogin, logout, selectUsername, selectBadCredMsg } from "./loginSlice";
import { useState } from "react";


function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Aircompany
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('username'),
    //   password: data.get('password'),
    // });
  };

  const dispatch = useDispatch();
  const [user, setUser] = useState("regular joe");
  const [pwd, setPwd] = useState("12345678");
  const loginStatus = useSelector(selectlogin);
  const userName = useSelector(selectUsername);
  const badCredMsg = useSelector(selectBadCredMsg);
  const is_active = useSelector(selectIs_active);
  const is_staff = useSelector(selectIs_staff);
  const is_superuser = useSelector(selectIs_superuser);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* text to show wrong cred's., greeting user/annonym, user rank */}
          {badCredMsg ? "The Username or Password is wrong, please try again" : ""}
          <h5> {loginStatus ? `Hello ${userName}, this is customer section` : "Hello annoymous User, this is customer section"} </h5>
          {is_active && "This user is active "}
          {is_staff && "This user is staff "}
          {is_superuser && "This user is superuser "}

          {loginStatus ? 
          (<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() =>
                dispatch(logout())}>
              Logout
            </Button>) 
          :

            (<div>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  name="user"
                  autoComplete="user"
                  autoFocus
                  onChange={(e) => setUser(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPwd(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() =>
                    dispatch(doLoginAsync({ username: user, password: pwd }))}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box></div>)}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />

      </Container>

    </ThemeProvider>

  );
}