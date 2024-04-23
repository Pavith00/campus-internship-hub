import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  return (
    <div className="home-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>Welcome to Job Search</h1>
            <p>Find your dream job with ease</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
          <div className="col-md-6">
            <img src="job-search-image.jpg" alt="Job Search" className="img-fluid" />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Search Jobs</h5>
                <p className="card-text">Search for jobs based on your skills, location, and preferences.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Create Profile</h5>
                <p className="card-text">Create a professional profile to showcase your skills and experience.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Apply Easily</h5>
                <p className="card-text">Apply to job listings with just a few clicks using your profile.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
