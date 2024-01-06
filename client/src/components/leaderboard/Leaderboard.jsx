import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from "axios";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

function Leaderboard({ isAuthenticated }) {
    if (isAuthenticated) {

        const [userData, setuserData] = useState([]);

        useEffect(() => {
            const getAllUsers = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/allusers`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                    const data = response.data.userData;
                    setuserData(data);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            }

            getAllUsers();
        }, [])

        return (
            <div style={{ padding: 20 }}>
                <center>
                    <Typography variant="h4" sx={{ mt: 5, mb: 5 }} gutterBottom>
                        <LeaderboardIcon fontSize="large" sx={{ mr: 2 }}></LeaderboardIcon>Leaderboard
                    </Typography>

                    <TableContainer component={Paper} style={{ width: "50%" }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "black" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "white", fontSize: 26, paddingRight: 20 }}>User</TableCell>
                                    <TableCell sx={{ color: "white", fontSize: 26, paddingLeft: 20 }}>Total Problem Solved</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userData.map((user) => (
                                    <TableRow key={user.username}>
                                        <TableCell sx={{ fontSize: 20, paddingRight: 30 }}><span style={{ color: "blue" }}>{user.username}</span></TableCell>
                                        <TableCell sx={{ fontSize: 20, paddingLeft: 30 }}>{user.problemSolved}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </center>
            </div>
        )
    }
}

export default Leaderboard