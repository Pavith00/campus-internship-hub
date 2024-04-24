import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./CreateAccount.css";

function UpdateCompany() {
  const [companyData, setCompanyData] = useState({
    firstName: "",
    lastName: "",
    personalEmail: "",
    companyName: "",
    email: "",
    address: "",
    phoneNumber: "",
    industry: "",
    description: "",
    website: "",
    username: "",
    
  });

  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem('username');
      if (username) {
        try {
          const response = await axios.get(`http://localhost:8080/company/${username}`);
          setCompanyData(response.data);
        } catch (error) {
          console.error('Error fetching company data:', error);
        }
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/company/${companyData.username}`, companyData);
      console.log(response.data);
      if (response.data.startsWith("Username")) {
        alert(response.data);
      } else {
        alert("Company updated successfully");
      }
    } catch (error) {
      console.error("Error updating company:", error);
      alert("An error occurred while updating company");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  return (
    <section className="container" style={{ backgroundColor: 'white', width: '600px' }}>
      <center><header className='RegHead'>Update Company Information</header></center>
      <form className="form" onSubmit={handleSubmit}>
        <center><p className='regSub'>Personal Information</p></center>
        <div className="input-box">
          <label >First Name</label>
          <input type="text" name="firstName" placeholder="Enter First name" value={companyData.firstName} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label >Last Name</label>
          <input type="text" name="lastName" placeholder="Enter Last name" value={companyData.lastName} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Personal Email Address</label>
          <input type="email" name="personalEmail" placeholder="Enter personal email address" value={companyData.personalEmail} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Company Name</label>
          <input type="text" name="companyName" placeholder="Enter company name" value={companyData.companyName} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Email Address</label>
          <input type="email" name="email" placeholder="Enter email address" value={companyData.email} onChange={handleChange} required />
        </div>

        <div className="input-box address">
          <label>Address</label>
          <input type="text" name="address" placeholder="Enter street address" value={companyData.address} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Phone Number</label>
          <input type="tel" name="phoneNumber" placeholder="Enter phone number" value={companyData.phoneNumber} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Industry</label>
          <input type="text" name="industry" placeholder="Enter industry" value={companyData.industry} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Description</label>
          <textarea name="description" placeholder="Enter description" value={companyData.description} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Website</label>
          <input type="text" name="text" placeholder="Enter website URL" value={companyData.website} onChange={handleChange} required />
        </div>


        <button type="submit">Update</button>
        <Link to={'/com-profile'}>
          <button type="button">Cancel</button>
        </Link>
      </form>
    </section>
  );
}

export default UpdateCompany;
