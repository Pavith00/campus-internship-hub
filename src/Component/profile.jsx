import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './profile.css';
import logo from '../images/03.jpg';
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
    navigate('/');
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
      <div className="navbar-top">
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

        <ul>

          <li>


          </li>
        </ul>
      </div>

      <div className="sidenav">
        <div className="profile">
          <img src={logo} alt="Logo" width="120" height="120" />

          <div className="name">JOBVOYEGE</div>

        </div>





        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" >
          <button class="nav-link active" id="v-pills-home-tab" data-bs-target="#home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={scrollToSection}>Home</button>

          <button class="nav-link" id="v-pills-jobs-tab" data-bs-target="#jobs" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Jobs</button>

          {/* Other buttons */}

        </div>



        <hr align="center" />

        <button onClick={handleLogout}
          class="btn btn-primary"> Logout
        </button>

      </div>

      <br /><br /><br />

      <div className="main" id='home'>

        <h2>IDENTITY</h2>
        <div class="card">
          <div class="card-body">

            <table>
              <tbody>

                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>
                    {user && (
                      <div>
                        {user.email}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>University</td>
                  <td>:</td>
                  <td>
                    {user && (
                      <div>
                        {user.university}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Graduate or Undergarduate</td>
                  <td>:</td>
                  <td>
                    {user && (
                      <div>
                        {user.gradOrUn}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Degree</td>
                  <td>:</td>
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


        <h2>Jobs For You</h2>
        <div id="jobs">


          <div class="card">
            <div class="card-body">

              <div>
                {/* Display fetched jobs */}
                {jobs.map((job) => (
                  <div key={job.id}>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <p>{job.path}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default Profile;
