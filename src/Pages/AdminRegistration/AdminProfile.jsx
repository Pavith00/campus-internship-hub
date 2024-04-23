import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Profile/profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [company, setCompany] = useState(null); // State to store company details
  const [candidates, setCandidates] = useState([]); // State to store candidates

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      axios
        .get(`http://localhost:8080/user/${username}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });

      // Fetch company details for the logged-in user
      axios
        .get(`http://localhost:8080/user/${username}`)
        .then((response) => {
          setCompany(response.data);
          // Fetch candidates for the company's jobs
          fetchCandidates(response.data.username);
        })
        .catch((error) => {
          console.error('Error fetching company details:', error);
        });

    }
  }, []);

  const fetchCandidates = (username) => {
    axios
      .get(`http://localhost:8080/user/${username}`)
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/adminLogin');
  };

  const scrollToSection = (e) => {
    const targetId = e.target.dataset.bsTarget;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to group candidates by job title
  const groupCandidatesByJobTitle = (candidates) => {
    const groupedCandidates = {};
    candidates.forEach(candidate => {
      if (!groupedCandidates[candidate.jobTitle]) {
        groupedCandidates[candidate.jobTitle] = [];
      }
      groupedCandidates[candidate.jobTitle].push(candidate);
    });
    return groupedCandidates;
  };

  return (
    <div>
      
      <div className="title">
        <h2>
          {user && (
            <div>
              <h2>Welcome, {user.companyName}</h2>
            </div>
          )}
        </h2>
      </div>


      <div className="sidenav">
        <div className='buttons'>
          <div className="nav flex-column nav-pills me-3" id="v-pills-tab">
          <Link to="/quizupload" >
            <button className="btn btn-outline-secondary b" data-bs-target="#home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={scrollToSection}>Quiz Upload</button><br />
            </Link>
            <Link to="/fss" >
            <button className="btn btn-outline-secondary b" data-bs-target="#jobByPath" type="button" role="tab" aria-controls="v-pills-jobByPath" aria-selected="false" onClick={scrollToSection}>Mentor</button><br />
            </Link>
            
          </div>
        </div>
        <hr align="center" />
        <center>
          <button onClick={handleLogout} type="button" className="btn btn-outline-danger">Logout</button>
        </center>
      </div>

      
         
        
     
    </div>
  );
}

export default AdminProfile;
