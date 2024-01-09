import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Avatar } from '@mui/material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CreateIcon from '@mui/icons-material/Create';

function Navbar({ isAuthenticated, setisAuthenticated }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState(null);
    const [isAdmin, setisAdmin] = useState(location.pathname.startsWith("/admin"));

    useEffect(() => {
        setisAdmin(location.pathname.startsWith("/admin"));
    }, [location.pathname]);

    const URL = isAdmin ? `${import.meta.env.VITE_BASE_URL}/admin/me` : `${import.meta.env.VITE_BASE_URL}/user/me`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } });
                isAdmin ? setUsername(response.data.admin.username) : setUsername(response.data.user.username);
            } catch (error) {
                console.log("is this admin ? " + isAdmin);
                console.log("Unauthorized " + (isAdmin ? "admin" : "user"));
            }
        }
        fetchData();
    }, [isAdmin]);

    useEffect(() => {
        if (username) {
            setisAuthenticated(true);
        }
    }, [username, setisAuthenticated]);

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "black" }}>
                    <Toolbar>
                        <Button sx={{ display: 'flex', alignItems: 'center' }} color="inherit" onClick={() => { isAdmin && isAuthenticated ? navigate("/admin/") : navigate("/") }} >
                            <Typography component="div" sx={{ fontSize: 30, color: "lightgreen" }}>
                                {'<'} CODEMON {'/>'}
                            </Typography>
                        </Button>
                        <Box sx={{ flexGrow: 1 }} />

                        {username ? (
                            <>
                                {isAdmin ? (
                                    <>
                                        <Button color="inherit" sx={{ fontSize: 20, marginRight: 10 }} onClick={() => { navigate("/admin/addproblem") }} >
                                            <AddIcon color="success" fontSize='large' sx={{ mr: 1 }} />
                                            Problem
                                        </Button>
                                        <AdminPanelSettingsIcon fontSize='large' color="error" />
                                    </>
                                ) : null}

                                {!isAdmin ? <Button color="inherit" sx={{ fontSize: 20, marginRight: 5 }} onClick={() => { navigate("/blogs") }}>
                                    <CreateIcon sx={{ mr: 1 }}></CreateIcon> Blogs
                                </Button> : null}

                                {!isAdmin ? <Button color="inherit" sx={{ fontSize: 20, marginRight: 5 }} onClick={() => { navigate("/leaderboard") }}>
                                    <LeaderboardIcon sx={{ mr: 1 }}></LeaderboardIcon> Leaderboard
                                </Button> : null}

                                <Button color="inherit" sx={{ fontSize: 20, marginLeft: 1, color: isAdmin ? "red" : "white", textTransform: "none" }} onClick={!isAdmin ? () => { navigate("/profile") } : null} >
                                    {!isAdmin ? <Avatar sx={{ mr: 2 }}></Avatar> : null}
                                    {username}
                                </Button>
                                <Button color="inherit" sx={{ fontSize: 20, marginLeft: 5 }}
                                    onClick={() => { localStorage.setItem("token", null); isAdmin ? window.location = "/admin/login" : window.location = "/"; }}> Logout </Button>
                            </>
                        ) : (
                            isAdmin ? null : (
                                <>
                                    <Button color="inherit" sx={{ fontSize: 18 }} onClick={() => { navigate("/login") }} >Login</Button>
                                    <Button color="inherit" sx={{ fontSize: 18, marginLeft: 5 }} onClick={() => { navigate("/register") }} >Register</Button>
                                </>
                            )
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar;
