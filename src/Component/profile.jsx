import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './profile.css';
import logo from '../images/03.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

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
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    // Use navigate function to redirect to login page
    navigate('/');
  };

   const scrollToTabNavigation = () => {
    // Scroll to the tab navigation container
    document.querySelector('.d-flex.align-items-start').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className="navbar-top">
        <div className="title">
          <h2>
            {user && (
              <div>
                <h2>Welcome, {user.name}</h2>
                {/* Display other user details */}
              </div>
            )}
          </h2>
        </div>

        <ul>
          <li>
            <a href="#message">
              <span className="icon-count">29</span>
              <i className="fa fa-envelope fa-2x"></i>
            </a>
          </li>
          <li>
            <a href="#notification">
              <span className="icon-count">59</span>
              <i className="fa fa-bell fa-2x"></i>
            </a>
          </li>
          <li>
            <button onClick={handleLogout}
            class="btn btn-primary"> Logout
            </button>
         
          </li>
        </ul>
      </div>

      <div className="sidenav">
        <div className="profile">
          <img src={logo} alt="Logo" width="120" height="120" />

          <div className="name">ImDezCode</div>
          
        </div>

        <div class="d-flex align-items-start">
          <div class="nav flex-column nav-pills me-3" id="v-pills-tab" >
            <button class="nav-link active" id="v-pills-home-tab" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={scrollToTabNavigation}>Home</button>
            <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
            <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button>
            <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</button>
          </div>
          
        </div>

        <div className="sidenav-url">
          <div className="url">
            <a href="#profile" className="active">
              Profile
            </a>
            
          </div>
          <div className="url">
            <a href="#settings">Settings</a>
            <hr align="center" />
          </div>
        </div>
      </div>

      <div className="main">
        <h2>IDENTITY</h2>
        <div class="card">
            <div class="card-body">
                <i class="fa fa-pen fa-xs edit"></i>
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

        <h2>SOCIAL MEDIA</h2>
        <div class="card">
            <div class="card-body">
                <i class="fa fa-pen fa-xs edit"></i>
                <div class="social-media">
                    <span class="fa-stack fa-sm">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab fa-facebook fa-stack-1x fa-inverse"></i>
                    </span>
                    <span class="fa-stack fa-sm">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                    </span>
                    <span class="fa-stack fa-sm">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab fa-instagram fa-stack-1x fa-inverse"></i>
                    </span>
                    <span class="fa-stack fa-sm">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab fa-invision fa-stack-1x fa-inverse"></i>
                    </span>
                    <span class="fa-stack fa-sm">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                    </span>
                    <span class="fa-stack fa-sm">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
                    </span>
                    <span class="fa-stack fa-sm">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab fa-snapchat fa-stack-1x fa-inverse"></i>
                    </span>
                    <div class="tab-content" id="v-pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
            <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
            <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
            <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
            <hr align="center" />
          </div>
                </div>
            </div>
        </div>
    </div>
  
      
    </div>
  );
}

export default Profile;
