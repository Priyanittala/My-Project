import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

// Create a blue-green theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b', // teal dark
      contrastText: '#fff',
    },
    secondary: {
      main: '#004d40', // darker teal
      contrastText: '#fff',
    },
    background: {
      default: '#e0f7f5', // light teal background
      paper: '#ffffff',
    },
    text: {
      primary: '#004d40',
      secondary: '#00796b',
    },
  },
  typography: {
    fontFamily: "'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

export default function Register() {
  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [UserType, setUserType] = useState('user'); // New state for user type

  const history = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:7018/api/auth/signup', {
        username: UserName,
        email: Email,
        password: Password,
        role: [UserType], // Send role as array if your backend expects it
      });
      console.log(response);
      history("/");
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally show error message to user here
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ bgcolor: 'background.default', borderRadius: 2, boxShadow: 3, py: 5 }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'text.primary',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3, width: '100%' }} onSubmit={handleSignUp}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  color="primary"
                />
              </Grid>
              {/* User Type Selection */}
              <Grid item xs={12}>
                <TextField
                  select
                  required
                  fullWidth
                  id="userType"
                  label="Register as"
                  value={UserType}
                  onChange={(e) => setUserType(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  color="primary"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontWeight: 700 }}
              color="primary"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2" sx={{ color: 'primary.main' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
