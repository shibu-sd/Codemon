import React, { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function UserProblemset() {

    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();

    function getDifficulty(difficulty) {
        let color;
        if (difficulty == "easy") {
            color = "success";
        }
        else if (difficulty == "medium") {
            color = "warning";
        }
        else {
            color = "error";
        }
        return color;
    }

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/problemset`, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } });
                const problems = response.data.problems;
                setProblems(problems);
                console.log(problems);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProblems();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, marginTop: 10 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: "grey", color: 'white', borderRight: '1px solid black', fontSize: 20 }}>ID</TableCell>
                        <TableCell sx={{ backgroundColor: "grey", color: 'white', borderRight: '1px solid black', fontSize: 20 }}>Title</TableCell>
                        <TableCell sx={{ backgroundColor: "grey", color: 'white', borderRight: '1px solid black', fontSize: 20 }}>Tags</TableCell>
                        <TableCell sx={{ backgroundColor: "grey", color: 'white', borderRight: '1px solid black', fontSize: 20 }}>Difficulty</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {problems.map((problem) => (
                        <TableRow key={problem.id}>
                            <TableCell sx={{ borderRight: '1px solid grey', fontSize: 18 }}>{problem.id}</TableCell>
                            <TableCell sx={{ borderRight: '1px solid grey' }}> <Button sx={{fontSize : 18}} onClick={() => {navigate("/problem/" + problem.id)}} > {problem.title}  </Button> </TableCell>
                            <TableCell sx={{ borderRight: '1px solid grey', fontSize: 18 }}>{problem.tags.join(', ')}</TableCell>
                            <TableCell sx={{ borderRight: '1px solid grey', fontSize: 18}}> <Button size="large" variant="contained" color={getDifficulty(problem.difficulty)}>{problem.difficulty}</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}

export default UserProblemset;
