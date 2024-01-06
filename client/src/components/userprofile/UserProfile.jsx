import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from "axios";

function UserProfile({ isAuthenticated }) {

    const [username, setUsername] = useState("");
    const [problemSolved, setproblemSolved] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/me`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                const data = response.data;
                setUsername(data.user.username);
                setproblemSolved(data.problemSolved)
                console.log(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }

        getUser();
    }, [])

    if (isAuthenticated) {
        return (
            <div style={{ padding: 20 }}>
                <Typography variant="h4" sx={{ mt: 5 }} gutterBottom>
                    Username : <span style={{ color: "blue" }}>{username}</span>
                </Typography>

                <Typography sx={{ mt: 3, mb: 5 }} variant="h4" gutterBottom>
                    Total Problems Solved : <span style={{ color: "blue" }}>{problemSolved.length}</span>
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "black" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white", fontSize: 24 }}>ID</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 24 }}>Problem Name</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 24 }}>Verdict</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {problemSolved.map((problem) => (
                                <TableRow key={problem.split(":")[0]}>
                                    <TableCell sx={{ fontSize: 18 }}>{problem.split(":")[0]}</TableCell>
                                    <TableCell sx={{ fontSize: 18 }}>{problem.split(":")[1]}</TableCell>
                                    <TableCell sx={{ fontSize: 18 }}><span style={{color : "green"}}>Accepted</span></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default UserProfile