import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AvailableVideosPage.css'; // Import CSS file for styling
import videoimg from 'E:/fullstack-project/InternshipHub_backend/campus_internshiphub_frontend/New folder/campus-internship-hub/src/Component/images/youtube-video-article.jpg'

function AvailableVideosPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get('http://localhost:8080/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }

    fetchVideos();
  }, []);

  return (
    
    <div className="video-container">
      <br></br><br></br><br></br>
      <h2>Available Skill Development Videos</h2>
      <div className="videos-list">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <p>Category: {video.category}</p>
            {/* Wrap the video icon in an anchor tag with the video link as its href */}
            <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
              <img src={videoimg} alt="Video Icon" className="video-icon" width="150" height="100" />
          
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableVideosPage;
