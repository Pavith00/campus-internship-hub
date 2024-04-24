import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import emailjs from 'emailjs-com';

function QuizScoreDisplay() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const form = useRef(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      axios
        .get(`http://localhost:8080/company/${username}`)
        .then((response) => {
          setUser(response.data);
          setCompany(response.data);
          fetchCandidates(response.data.companyName);
        })
        .catch((error) => {
          console.error('Error fetching user/company data:', error);
        });
    }
  }, []);

  const fetchCandidates = (companyName) => {
    axios
      .get(`http://localhost:8080/cv/company/${companyName}`)
      .then(async (response) => {
        const candidatesData = response.data;
        const candidatesWithScores = await Promise.all(
          candidatesData.map(async (candidate) => {
            const email = candidate.email;
            try {
              const quizResponse = await axios.get(`http://localhost:8080/api/quizzes/attempts/${email}`);
              const quizScores = quizResponse.data;
              return { ...candidate, quizScores };
            } catch (error) {
              console.error('Error fetching quiz attempts for candidate:', error);
              return { ...candidate, quizScores: [] };
            }
          })
        );
        setCandidates(candidatesWithScores);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/com-login');
  };

  const sendEmail = (e) => {
    e.preventDefault();
    var templateParams = {
      name: 'James',
      email: 'ramanayakepavithra2000@gmail.com',
      message: 'Check this out!',
    };
    emailjs.send('service_93clbjx', 'template_yzh8lgg', templateParams, 'p3R1yhca-pdsh7Bee')
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset();
          setErrorMessage('');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const scrollToSection = (e) => {
    const targetId = e.target.dataset.bsTarget;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const deleteCompany = () => {
    const username = localStorage.getItem('username');
    axios
      .delete(`http://localhost:8080/company/${username}`)
      .then((response) => {
        console.log('Company deleted:', response.data);
        alert('Company profile successfully deleted.');
      })
      .catch((error) => {
        console.error('Error deleting company:', error);
        alert('Company profile failed to delete.');
      });
  };

  return (
    <div>
      <br/><br/><br/><br/>
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
          <div className="nav flex-column nav-pills me-3" id="v-pills-tab"><br />
            <Link to="/com-profile" >
              <button className="btn btn-outline-secondary b" data-bs-target="#home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={scrollToSection}>Profile</button><br /><br />
            </Link>
            <Link to="/postjob" >
              <button className="btn btn-outline-secondary b" data-bs-target="#jobByPath" type="button" role="tab" aria-controls="v-pills-jobByPath" aria-selected="false" onClick={scrollToSection}>Post a Job</button><br /><br />
            </Link>
            <Link to="/">
              <button className="btn btn-outline-secondary b" data-bs-target="#jobs" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Jobs</button><br /><br />
            </Link>
            <Link to="/candidates">
              <button className="btn btn-outline-secondary b" data-bs-target="#candidates" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Posted Jobs</button><br></br>
            </Link>
            <Link
              to={{
                pathname: "/updateCompany",
                state: { userData: user } // Pass user data as state
              }}
            ><br></br>
              <button className="btn btn-outline-secondary b">Update</button>
            </Link>
          </div>
        </div>
        <hr align="center" />
        <center>
          <Link to="/">
            <button onClick={handleLogout} type="button" className="btn btn-outline-success b">Logout</button>
          </Link><br/><br/>
          <Link to="/">
            <button onClick={ deleteCompany} type="button" className="btn btn-outline-danger b">Delete Profile</button>
          </Link>
        </center>
      </div>

      <br /><br /><br />

      <div className="main" id='home'>
        <h2>Personal Details</h2>
        <div className="card">
          <div className="card-body">
            <p><b>First Name: </b>{user?.firstName}</p>
            <p><b>Last Name: </b>{user?.lastName}</p>
            <p><b>Personal Email: </b>{user?.personalEmail}</p>
          </div>
        </div>

        <h2>COMPANY DETAILS</h2>
        <div className="card">
          <div className="card-body">
            <p><b>Company Name: </b>{company?.companyName}</p>
            <p><b>Email: </b>{company?.email}</p>
            <p><b>Address: </b>{company?.address}</p>
            <p><b>Industry: </b>{company?.industry}</p>
            <p><b>Website: </b>{company?.website}</p>
            <p><b>Phone Number: </b>{company?.phoneNumber}</p>
            <p><b>Description: </b>{company?.description}</p>
          </div>
        </div>

        <div className="container">
          <h2>Candidates</h2>
          {candidates.map((candidate) => (
            <div key={candidate.id} className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">Candidate: {candidate.firstName}</h3>
                <p><b>Email:</b> {candidate.email}</p>
                <p><b>Degree Program:</b> {candidate.degreeProgram}</p>
                <p><b>Short Description:</b> {candidate.shortDescription}</p>
                <h4>Quiz Scores:</h4>
                <ul>
                  {candidate.quizScores.map((attempt, index) => (
                    <div key={index} className="mb-3">
                    <p><b>Quiz Title:</b> {attempt.quizTitle}</p>
                    {/* Progress bar component */}
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" style={{ width: `${attempt.quizScore}%` }} aria-valuenow={attempt.quizScore} aria-valuemin="0" aria-valuemax="100">{attempt.quizScore}%</div>
                    </div>
                  </div>
                  ))}
                </ul>
                <Button type="primary" href={`http://localhost:8080/cv/${candidate.id}`} download>Download CV</Button>
                <Button type="primary" onClick={sendEmail} className="ml-2">Send Message</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




export default QuizScoreDisplay;
