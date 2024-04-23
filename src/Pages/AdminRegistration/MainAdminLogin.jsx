import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Add Link import
import logo from 'E:/fullstack-project/InternshipHub_backend/campus_internshiphub_frontend/New folder/campus-internship-hub/src/Component/images/02.jpg'

const MainAdminLogin = () => {
  const [username, setUsername] = useState(''); // Changed 'email' to 'username'
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    if (username === 'admin' && password === 'admin') {
      // Navigate to profile page if username and password are admin
      navigate('/admin');
    } else {
      // Show alert message if username or password is incorrect
      window.alert('Incorrect username or password');
    }
  };

  return (
    <div>
      <form className="form_container" onSubmit={handleSubmit}>
        <div>
          <img src={logo} alt="Logo" width={150} />
        </div>
        <div className="title_container">
          <span className="subtitle">Get started with us, just create an account and enjoy the experience.</span>
        </div>
        <br />
        <div className="input_container">
          <label className="input_label" htmlFor="email_field"></label>
          <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
            {/* Your SVG code */}
          </svg>
          <input placeholder="Username" title="Input title" name="input-name" type="text" className="input_field" id="email_field" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="password_field"></label>
          <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
            {/* Your SVG code */}
          </svg>
          <input placeholder="Password" title="Input title" name="input-name" type="password" className="input_field" id="password_field" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button title="Sign In" type="submit" className="sign-in_btn">
          <span>Sign In</span>
        </button>
        <div>
        <button  className="sign-in_btn" style={{ width: '400px' }}>
        <Link to="/adminLogin" style={{ textDecoration: 'none', textDecoration: 'none', color: 'white' }}>
    <span>Login As Admin</span>
  </Link>
        </button>
        </div>
        <p className="note">Terms of use &amp; Conditions</p>
      </form>
    </div>
  );
};




export default MainAdminLogin;
