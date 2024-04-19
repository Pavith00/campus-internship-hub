import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const [jobs, setJobs] = useState([]); // State to store fetched jobs

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      axios
        .get(`http://localhost:8080/student/${username}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });

      // Fetch jobs related to the student's path
      axios
        .get(`http://localhost:8080/student/username/${username}/jobs`)
        .then((response) => {
          setJobs(response.data);
        })
        .catch((error) => {
          console.error('Error fetching jobs:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    // Use navigate function to redirect to login page
    navigate('/login');
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
      <div className="title">
        <h2>
          {user && (
            <div>
              <h2>Welcome, {user.fname}</h2>
              {/* Display other user details */}
            </div>
          )}
        </h2>
      </div>

      <div className="sidenav">

        <div className='buttons'>
          <div class="nav flex-column nav-pills me-3" id="v-pills-tab" >
            <button class="btn btn-outline-secondary b" id="v-pills-home-tab" data-bs-target="#home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={scrollToSection}>Home</button><br />

            <button class="btn btn-outline-secondary b" id="v-pills-jobByPath-tab" data-bs-target="#jobByPath" type="button" role="tab" aria-controls="v-pills-jobByPath" aria-selected="false" onClick={scrollToSection}>Job For You</button><br />
            <Link to="/" >
              <button class="btn btn-outline-secondary b" id="v-pills-jobs-tab" data-bs-target="#jobs" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Jobs</button></Link><br />
              <Link to="/quizattempt" >
              <button class="btn btn-outline-secondary b" id="v-pills-jobs-tab" data-bs-target="#jobs" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Skill Assesment</button></Link>
            
            {/* Other buttons */}

          </div>
        </div>



        <hr align="center" />

        <center>
          <button onClick={handleLogout} type="button" class="btn btn-outline-danger b">
            Logout
          </button>
        </center>

      </div>

      <br /><br /><br />

      <div className="main" id='home'>

        <h2>IDENTITY</h2>
        <div class="card">
          <div class="card-body">

            <table>
              <tbody>

                <tr>
                  <td><b>Email</b></td>
                  <td><b>:</b></td>
                  <td>
                    {user && (
                      <div>
                        {user.email}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td><b>University</b></td>
                  <td><b>:</b></td>
                  <td>
                    {user && (
                      <div>
                        {user.university}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td><b>Graduate or Undergarduate</b></td>
                  <td><b>:</b></td>
                  <td>
                    {user && (
                      <div>
                        {user.gradOrUn}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td><b>Degree</b></td>
                  <td><b>:</b></td>
                  <td>
                    {user && (
                      <div>
                        {user.degree} in {user.department}
                      </div>
                    )}
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>


        <h2>JOBS FOR YOU</h2>
        <div id="jobByPath">




          <div>
            {/* Display fetched jobs */}
            {jobs.map((job) => (
              <div class="card">
                <div class="card-body">
                  <div key={job.id}>
                    <h4 className="job-title">
                      {job.title}
                    </h4>
                    <h6 className="company">
                      {job.company}
                    </h6>
                    <h5 className="company">
                      {job.description}
                    </h5>
                    <h5 className="company">
                      {job.skills}
                    </h5>
                    <Link to={`/CVUpload/${job.title}`} className="btn btn-apply float-sm-right float-xs-left"> {/* Update the link */}
                      Apply
                    </Link>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
    </div>


  );
}

export default Profile;
