import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="container text-center">
        
        <div>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className="social-icon" size="2x" /></a>
          <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} className="social-icon" size="2x" /></a>
          <a href="https://www.github.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className="social-icon" size="2x" /></a>
        </div>
        <p>&copy; 2024 InternshipHub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
