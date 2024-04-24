import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/adminLogin');
  };
  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Function to handle playing a video
  const playVideo = (videoLink) => {
    window.open(videoLink, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/videos/add', {
        category,
        videoLink,
      });
      console.log(response.data);
      alert('Video added successfully!');
      // Clear the form after successful submission
      setCategory('');
      setVideoLink('');

      // Fetch all video links again to update the list
      fetchVideos();
    } catch (error) {
      console.error('Error adding video:', error);
      alert('An error occurred while adding the video');
    }
  };

  return (
    <div className="container mt-5">
      <br></br><br></br>
      <div className="row">
        <div className="col-md-3">
          {/* Side Navigation */}
          <div className="sidenav">
            <div className='buttons'>
              <div className="nav flex-column nav-pills me-3" id="v-pills-tab">
                <Link to="/quizupload">
                  <button className="btn btn-outline-secondary b" data-bs-target="#home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Quiz Upload</button><br /><br></br>
                </Link>
                <Link to="/addvideos">
                  <button className="btn btn-outline-secondary b" data-bs-target="#jobByPath" type="button" role="tab" aria-controls="v-pills-jobByPath" aria-selected="false">Mentor</button><br />
                </Link>
              </div>
            </div>
            <hr align="center" />
            <center>
              <button onClick={handleLogout} type="button" className="btn btn-outline-danger">Logout</button>
            </center>
          </div>
        </div>
        <div className="col-md-9">
          {/* Main Content */}
          <div className="admin-content">
            <h2>Add and View Mentorship Videos</h2>
            <div className="add-video">
              <h3>Add Video</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="videoLink" className="form-label">Video Link:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="videoLink"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Add Video</button>
              </form>
            </div>
            <div className="video-list">
              <h3>Available Mentorship Videos</h3>
              {videos.map((video, index) => (
                <div key={index} className="video-item">
                  <p><span className="label">Category:</span> {video.category}</p>
                  <p>
                    <span className="label">Video Link:</span>
                    <span
                      className="video-link"
                      onClick={() => playVideo(video.videoLink)}
                    >
                      {video.videoLink}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
