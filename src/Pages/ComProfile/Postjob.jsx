import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Profile/profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Postjob() {
  const [company, setCompany] = useState(""); // State to store company name
  const [path, setPath] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch company name when component mounts
    const fetchCompany = async () => {
      try {
        // Make an API call to fetch the authenticated company's details
        const response = await axios.get("http://localhost:8080/company/" + localStorage.getItem('username'));
        setCompany(response.data.companyName); // Assuming the API response contains the company name
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompany();
  }, []); // Empty dependency array to ensure the effect runs only once

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Send the job details along with the company name to the backend
    const response = await axios.post("http://localhost:8080/job/post", {
      company: company,
      path: path,
      title: title,
      description: description,
      skills: skills,
      location: location
    });
    console.log(response.data);
    //alert("Job saved successfully");

    // Check if the job was posted successfully
    if (response.status >= 200 && response.status < 300) {
      alert("Job posted successfully");
      // Reset form fields after successful posting
      setPath("");
      setTitle("");
      setDescription("");
      setSkills("");
      setLocation("");
    } else if (response.data === "Job already exists with the same title") {
      alert("Job already exists with the same title");
    } else {
      alert("An error occurred while posting job");
    }
  } catch (error) {
    console.error("Error posting job:", error);
    alert("An error occurred while posting job");
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

  return (
    <div>
      {/* Sidebar navigation */}
      <div className="sidenav">
        <div className='buttons'>
          <div class="nav flex-column nav-pills me-3" id="v-pills-tab" >
            <Link to="/com-profile">
              <button class="btn btn-outline-secondary b" id="v-pills-home-tab" data-bs-target="#home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={scrollToSection}>Profile</button><br /><br></br>
            </Link>
            <Link to="/postjob">
              <button class="btn btn-outline-secondary b" id="v-pills-postJob-tab" data-bs-target="#postJob" type="button" role="tab" aria-controls="v-pills-jobByPath" aria-selected="false" onClick={scrollToSection}>Post a Job</button><br /><br></br>
            </Link>
            <Link to="/">
              <button class="btn btn-outline-secondary b" id="v-pills-jobs-tab" data-bs-target="#jobs" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Jobs</button>
            </Link><br></br>
            <Link to="/candidates">
              <button className="btn btn-outline-secondary b" data-bs-target="#candidates" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Posted Jobs</button><br></br>
            </Link>
            {/* Other buttons */}
          </div>
        </div>
        <hr align="center" />
        <center>
          <br></br>
          <button onClick={handleLogout} type="button" class="btn btn-outline-danger">
            Logout
          </button>
        </center>
      </div>
      <br /><br /><br />
      <div className="main" id='postJob'>
        <h2>Create New Job</h2>
        <div class="card">
          <div class="card-body">
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
    <label for="companyInput" class="form-label">Company Name</label>
    <input type="text" class="form-control cl" id="companyInput" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} required disabled />
  </div>
              <div class="mb-3">
                <label for="titleInput" class="form-label">Job Title</label>
                <input type="text" class="form-control cl" id="titleInput" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div class="mb-3">
                <label for="industrySelect" class="form-label">Industry</label>
                <select class="form-select cl" id="industrySelect" aria-label="Select Industry" value={path} onChange={(e) => setPath(e.target.value)} required>
                  <option selected >Choose the Industry</option>
                  <option>Software Development</option>
                  <option>Information Technology (IT) Services</option>
                  <option>Data Science and Analytics</option>
                  <option>Cloud Computing</option>
                  <option>Database Administration</option>
                  <option>DevOps</option>
                  <option>Quality Assurance (QA) and TestingUI/UX Design</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="descriptionInput" class="form-label">Description</label>
                <textarea class="form-control cl" id="descriptionInput" placeholder="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div class="mb-3">
                <label for="skillsInput" class="form-label">Skills Required</label>
                <input type="text" class="form-control cl" id="skillsInput" placeholder="Skills Required" value={skills} onChange={(e) => setSkills(e.target.value)} required />
              </div>
              <div class="mb-3">
                <label for="locationInput" class="form-label">Location</label>
                <input type="text" class="form-control cl" id="locationInput" placeholder="Job Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>
              <button type="submit" class="btn btn-primary">Post Job</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Postjob;
