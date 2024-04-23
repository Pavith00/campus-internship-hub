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

  const fetchJobs = async () => {
    try {
      const username = localStorage.getItem('username'); // Retrieve username from local storage
      const company = await getCompanyByUsername(username); // Fetch company details using the username
      const companyJobs = await getJobsByCompany(company.companyName); // Fetch jobs posted by the company
      setJobs(companyJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const getCompanyByUsername = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/company/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching company:', error);
      throw error;
    }
  };

  const getJobsByCompany = async (companyName) => {
    try {
      const response = await axios.get(`http://localhost:8080/job/company/${companyName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs by company:', error);
      throw error;
    }
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

  /***** */
  const deleteJob = async (title) => {
    try {
      await axios.delete(`http://localhost:8080/job/${title}`);
      fetchJobs(); // Refresh job listings after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div>
      <br /><br /><br /><br />
      <div className="title">
        
      </div>

      <div className="sidenav">
        <div className='buttons'>
          <div className="nav flex-column nav-pills me-3" id="v-pills-tab">
            <Link to="/com-profile">
              <button className="btn btn-outline-secondary b" data-bs-target="#home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={scrollToSection}>Profile</button><br /><br />
            </Link>
            <Link to="/postjob">
              <button className="btn btn-outline-secondary b" data-bs-target="#jobByPath" type="button" role="tab" aria-controls="v-pills-jobByPath" aria-selected="false" onClick={scrollToSection}>Post a Job</button><br /><br />
            </Link>
            <Link to="/">
              <button className="btn btn-outline-secondary b" data-bs-target="#jobs" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Jobs</button><br /><br />
            </Link>
            <Link to="/candidates">
              <button className="btn btn-outline-secondary b" data-bs-target="#candidates" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Posted Jobs</button><br /><br />
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
              <button onClick={() => deleteJob(job.title)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Candidates;
