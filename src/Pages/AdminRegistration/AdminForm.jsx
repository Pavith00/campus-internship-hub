import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CVUpload/CVUpload.css';
import './AdminForm.css'



function AdminForm() {
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminFormData, setAdminFormData] = useState({
    name: '',
    phone: '',
    email: '',
    username: '',
    password: ''
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user');
      setAdminUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email, username, password } = adminFormData;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number (10 digits only)");
      return;
    }
    // Regular expression for password validation (minimum 6 characters)
  const passwordRegex = /^.{6,}$/;

  // Check if password meets minimum length requirement
  if (!passwordRegex.test(password)) {
    alert("Password must be at least 6 characters long");
    return;
  }
  // Regular expression for username validation (at least 3 characters)
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

  // Check if username meets minimum length requirement
  if (!usernameRegex.test(username)) {
    alert("Username must be at least 3 characters long and can only contain letters, numbers, and underscores");
    return;
  }

    try {
      const response = await axios.post("http://localhost:8080/user/register", adminFormData);
      if (response.data.startsWith("Username")) {
        // Username already exists
        alert(response.data);
      } else {
        // User registered successfully
        alert("User registered successfully");
        // Refresh user list after successful registration
        fetchAdminUsers();
        // Clear form fields after successful registration
        setAdminFormData({
          name: "",
          phone: "",
          email: "",
          username: "",
          password: ""
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering user");
    }
  };
  

  const handleDelete = async (username) => {
    try {
      await axios.delete(`http://localhost:8080/user/${username}`);
      fetchAdminUsers();
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setAdminFormData({ ...adminFormData, [e.target.name]: e.target.value });
  };

  return (
    <div >
      <h2 className="admin-h2">Admin Panel</h2>
      <h3 className="admin-h3">User Registration</h3>
      <div className='admin-card'>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={adminFormData.name} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={adminFormData.phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={adminFormData.email} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={adminFormData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={adminFormData.password} onChange={handleChange} required />
        <button type="submit" className="admin-button">Register</button>
      </form>
      </div>

      <h3 className="admin-h3">User List</h3>
      <ul className="admin-ul">
        {adminUsers.map((adminUser) => (
          <li key={adminUser.username} className="admin-li">
            <span>Name: {adminUser.name}</span>
            <span>Phone: {adminUser.phone}</span>
            <span>Email: {adminUser.email}</span>
            <span>Username: {adminUser.username}</span>
            <button onClick={() => handleDelete(adminUser.username)} className="admin-delete-btn">Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default AdminForm;
