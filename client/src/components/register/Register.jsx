import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import "../../assets/css/Register.css";
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Register() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      if (!username || !password) {
        alert("Username / Password cannot be empty");
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, { username, password });
      console.log(response.data);
      alert("User registered successfully");
      navigate("/login");
    } 
    catch (error) {
      alert("Username already exists");
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs" className='register-container' sx={{ width: 500, height: 500, marginTop: 20, boxShadow: 5 }}>
        <Box
          sx={{
            marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5"> Register <PersonAddIcon sx={{ color: "green", marginLeft: 1 }} /> </Typography>
          <Box sx={{ marginTop: 3 }}>
            <TextField margin="normal" required fullWidth id="username" name="username" label="Username" type="text" autoFocus onChange={(e) => { setUsername(e.target.value) }} />
            <TextField margin="normal" required fullWidth id="password" name="password" label="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
            <Button  fullWidth variant="contained" sx={{ mt: 4, mb: 3, fontSize: 18, '&:hover': { backgroundColor: "darkgreen" }, backgroundColor: "green" }}
              onClick={handleRegister}>
              Register
            </Button>

            <center>
              <Typography color="grey" sx={{ fontSize: 18, marginTop: 4 }}>
                Already have an account ?
                <Button sx={{ fontSize: 18 }} onClick={() => { navigate("/login") }} > <Link> Login </Link> </Button>
              </Typography>
            </center>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Register;