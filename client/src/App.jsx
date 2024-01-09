import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import AdminHome from './components/admin/AdminHome';
import AddProblem from './components/admin/AddProblem';
import EditProblem from './components/admin/EditProblem';
import Problem from './components/problem/Problem';
import UserProfile from './components/userprofile/UserProfile';
import Leaderboard from './components/leaderboard/Leaderboard';
import Blogs from './components/blog/Blogs';
import CreateBlogs from './components/blog/CreateBlogs';

function App() {

  const [isAuthenticated, setisAuthenticated] = useState(false);

  return (
    <>
      <Router>
        <div>
          <Navbar isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} />
          <Routes>
            <Route path='/' element={<Home isAuthenticated={isAuthenticated} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<UserProfile isAuthenticated={isAuthenticated} />} />
            <Route path='/blogs' element={<Blogs isAuthenticated={isAuthenticated} />} />
            <Route path='/createblogs' element={<CreateBlogs isAuthenticated={isAuthenticated} />} />
            <Route path='/leaderboard' element={<Leaderboard isAuthenticated={isAuthenticated} />} />
            <Route path='/problem/:id' element={<Problem isAuthenticated={isAuthenticated} />} />
            <Route path='/admin/' element={<AdminHome isAuthenticated={isAuthenticated} />} />
            <Route path='/admin/login' element={<Login />} />
            <Route path='/admin/addproblem' element={<AddProblem isAuthenticated={isAuthenticated}/>} />
            <Route path='/admin/editproblem/:id' element={<EditProblem isAuthenticated={isAuthenticated}/>} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
