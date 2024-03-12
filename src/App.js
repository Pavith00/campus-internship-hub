
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import Profile from './Component/profile';
import Job from './Component/Job';

function App() {
  return (
   
    <Router>
    <center>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </center>
      <Routes>
        <Route path="/job" element={<Job />} />
      </Routes>
    </Router>
    
    
  );
}

export default App;
