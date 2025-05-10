import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';

export default function Login() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // new state for user type
  const [msg, setMsg] = useState('');
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7018/api/auth/signin', {
        username: Username,
        password: Password,
      });

      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      const gg = JSON.parse(localStorage.getItem("user"));
      const roles_array = gg.roles;

      // Navigate based on selected userType and roles returned
      if (userType === 'admin' && roles_array.includes("ROLE_ADMIN")) {
        history("/Admin-page");
      } else if (userType === 'user' && roles_array.includes("ROLE_USER")) {
        history("/dashboard");
      } else {
        setMsg("You do not have the required role for the selected login type.");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <CssVarsProvider>
      <main className='Login'>
        <Sheet
          sx={{
            width: 300,
            mx: 'auto',
            my: 4,
            py: 3,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              type="text"
              placeholder="Ankit"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Login as</FormLabel>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </FormControl>

          <Button sx={{ mt: 1 }} onClick={handleLogin}>Log in</Button>

          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>

          {msg && (
            <Typography color="danger" sx={{ mt: 1, textAlign: 'center' }}>
              {msg}
            </Typography>
          )}
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
