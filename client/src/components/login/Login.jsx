import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginIcon from '@mui/icons-material/Login';
import "../../assets/css/Login.css";
import { Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    location.pathname.startsWith("/admin") ? setisAdmin(true) : setisAdmin(false);
  },
    [location.pathname]);

  const URL = isAdmin ? `${import.meta.env.VITE_BASE_URL}/admin/login` : `${import.meta.env.VITE_BASE_URL}/user/login`;
  const NEW_URL = isAdmin ? "/admin/" : "/";

  const handleLogin = async () => {

    try {

      if (!username || !password) {
        alert("Username / Password cannot be empty");
        return;
      }

      const response = await axios.post(URL, { username, password });
      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      alert("Logged in successfully");
      window.location = NEW_URL;
    }
    catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs" className='login-container' sx={{ width: 500, height: 500, marginTop: 20, boxShadow: 5 }}>
        <Box
          sx={{
            marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >

          {isAdmin ? <Typography sx={{ fontSize: 32, color: "red", mt: 3, mb: 3 }}> Hello Admin ! </Typography> : null}

          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5"> Login <LoginIcon sx={{ color: "green", marginLeft: 1 }} /> </Typography>
          <Box sx={{ marginTop: 3 }}>
            <TextField margin="normal" required fullWidth id="username" name="username" label="Username" type="text" autoFocus onChange={(e) => { setUsername(e.target.value) }} />
            <TextField margin="normal" required fullWidth id="password" name="password" label="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
            <Button fullWidth variant="contained" sx={{ mt: 4, mb: 3, fontSize: 18, '&:hover': { backgroundColor: "darkgreen" }, backgroundColor: "green" }}
              onClick={handleLogin}>
              Login
            </Button>

            {isAdmin ? null :
              <center>
                <Typography color="grey" sx={{ fontSize: 18, marginTop: 4 }}>
                  Don't have an account ?
                  <Button sx={{ fontSize: 18 }} onClick={() => { navigate("/register") }} > <Link> Register </Link> </Button>
                </Typography>
              </center>
            }

          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Login