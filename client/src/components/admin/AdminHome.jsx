import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';


function AdminHome({ isAuthenticated }) {
  if (isAuthenticated) {

    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);

    useEffect(() => {
      const fetchProblems = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/problemset`, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } });
          const problems = response.data.problems;
          setProblems(problems);
          console.log(problems);
        } catch (error) {
          console.log(error);
        }
      }

      fetchProblems();
    }, []);

    const handleDelete = async (id) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/deleteproblem`, {id}, {headers : {"Authorization" : "Bearer " + localStorage.getItem("token")}});
        console.log(response);
        alert("Problem Deleted !");
        window.location = "/admin";
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700, marginTop: 10 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'grey', color: 'white', borderRight: '1px solid black', fontSize: 20 }}>ID</TableCell>
                <TableCell sx={{ backgroundColor: 'grey', color: 'white', borderRight: '1px solid black', fontSize: 20 }}>Title</TableCell>
                <TableCell sx={{ backgroundColor: 'grey', color: 'white', borderRight: '1px solid black', fontSize: 20 }}>Edit Problem</TableCell>
                <TableCell sx={{ backgroundColor: 'grey', color: 'white', borderRight: '1px solid black', fontSize: 20 }}>Delete Problem</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {problems.map((problem) => (
                <TableRow key={problem.id}>
                  <TableCell sx={{ borderRight: '1px solid grey', fontSize: 16 }}>{problem.id}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid grey', fontSize: 16 }}>{problem.title}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid grey', fontSize: 16 }}>
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined" color="primary" startIcon={<DeleteIcon color="primary" />} onClick={() => {navigate("/admin/editproblem/" + problem.id)}}>
                        Edit
                      </Button>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ borderRight: '1px solid grey', fontSize: 16 }}>
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined" color="error" startIcon={<DeleteIcon color="error" />} onClick={() => {handleDelete(problem.id)}}>
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </>
    )

  }
}

export default AdminHome