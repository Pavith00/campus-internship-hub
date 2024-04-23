import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState('');
  const [videoLink, setVideoLink] = useState('');

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
    <div className="container admin-dashboard">
      <br/><br/><br/>
      <h2>Add and View Mentorship Videos</h2><br/>
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
  );
}

export default AdminDashboard;
