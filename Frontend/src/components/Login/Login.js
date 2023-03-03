import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';

export default function Login() {
    const [Username,setUsername] = useState('');
    const [Password,setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:7018/api/auth/signin', {
                username: Username,
                password: Password
            }).then(response => {
                if (response.data.accessToken) {
                  localStorage.setItem("user", JSON.stringify(response.data));
                }
            });
            var gg = JSON.parse(localStorage.getItem("user"));
            const name = gg.username;
            const roles_array = gg.roles;
            console.log(gg);
            // await axios.post('http://localhost:5018/api/account/create', {
            //     accountNumber: name,
            //     currentBalance : 0.00,
            // },
            // {
            //     headers: {
            //         Authorization : 'Bearer ' + gg.accessToken
            //     }
            // });
            if(roles_array.indexOf("ROLE_ADMIN")>-1){
              history("/Admin-page");
            }
            else{
              history("/dashboard");
            }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    const handleLoginAdmin = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:7018/api/auth/signin', {
              username: Username,
              password: Password
          }).then(response => {
              if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
              }
          });
          var gg = JSON.parse(localStorage.getItem("user"));
          const name = gg.username;
          const roles_array = gg.roles;
          if(roles_array.indexOf("ROLE_ADMIN")>-1){
            history("/Admin-page");
          }
          if(roles_array.indexOf("ROLE_USER")>-1){
            history("/dashboard");
          }
      } catch (error) {
          if (error.response) {
              setMsg(error.response.data.msg);
          }
      }
  }
  return (
    <CssVarsProvider >
      <main className='Login'>
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
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
              // html input attribute
              name="username"
              type="text"
              placeholder="Ankit"
              value={Username} onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
              value={Password} onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button sx={{ mt: 1 /* margin top */ }} onClick={handleLogin}>Log in</Button>
          <Button sx={{ mt: 1 /* margin top */ }} onClick={handleLoginAdmin}>Admin? Click here to login</Button>
          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}