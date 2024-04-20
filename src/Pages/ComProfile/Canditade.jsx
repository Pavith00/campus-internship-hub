import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Candidates() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    axios.get(`http://localhost:8080/job`)
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/com-login');
  };

  const scrollToSection = (e) => {
    const targetId = e.target.dataset.bsTarget;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <br /><br />
      <div className="title">
        
      </div>

      <div className="sidenav">
        <div className='buttons'>
          <div className="nav flex-column nav-pills me-3" id="v-pills-tab">
            <Link to="/com-profile">
              <button className="btn btn-outline-secondary b" data-bs-target="#home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={scrollToSection}>Profile</button><br />
            </Link>
            <Link to="/postjob">
              <button className="btn btn-outline-secondary b" data-bs-target="#jobByPath" type="button" role="tab" aria-controls="v-pills-jobByPath" aria-selected="false" onClick={scrollToSection}>Post a Job</button><br />
            </Link>
            <Link to="/">
              <button className="btn btn-outline-secondary b" data-bs-target="#jobs" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Jobs</button>
            </Link>
            <Link to="/candidates">
              <button className="btn btn-outline-secondary b" data-bs-target="#candidates" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Posted Jobs</button>
            </Link>
          </div>
        </div>
        <hr align="center" />
        <center>
          <button onClick={handleLogout} type="button" className="btn btn-outline-danger">Logout</button>
        </center>
      </div>

      <div className="main">
        <h2>Job Listings</h2>
        {jobs.map(job => (
          <div className="card" key={job.id}>
            <div className="card-body">
              <h3>{job.title}</h3>
              <p><b>Company:</b> {job.company}</p>
              <p><b>Path:</b> {job.path}</p>
              <p><b>Description:</b> {job.description}</p>
              <p><b>Skills:</b> {job.skills}</p>
              <p><b>Industry:</b> {job.industry}</p>
              <p><b>Location:</b> {job.location}</p>
              {/* Display other job details */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Candidates;
