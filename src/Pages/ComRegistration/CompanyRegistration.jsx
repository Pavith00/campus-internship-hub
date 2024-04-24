import axios from 'axios';
import { useState } from "react";
import "./CreateAccount.css";
import { Link } from 'react-router-dom';

function CompanyRegistration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Regular expressions for email and phone number validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    /****update */
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!phoneRegex.test(phoneNumber)) {
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



    /***** */
    try {
      const response = await axios.post("http://localhost:8080/company/add", {
        firstName: firstName,
        lastName: lastName,
        personalEmail:personalEmail,
        companyName: companyName,
        email: email,
        address:address,
        phoneNumber: phoneNumber,
        industry: industry,
        description: description,
        website: website,
        username: username,
        password: password
      });
      console.log(response.data);
      if (response.data.startsWith("Username")) {
        alert(response.data);
      } else { 
        alert("Company registered successfully");
        // Reset form fields after successful registration
        setFirstName("");
        setLastName("");
        setPersonalEmail("");
        setCompanyName("");
        setEmail("");
        setAddress("");
        setPhoneNumber("");
        setIndustry("");
        setDescription("");
        setWebsite("");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error registering company:", error);
      alert("An error occurred while registering company");
    }
  };

  return (
    <section className="container" style={{backgroundColor:'white', width:'600px'}}>  
      <center><header className='RegHead'>Company Registration Form</header></center>
      <form className="form" onSubmit={handleSubmit}>
        <center> <p className='regSub'>Personal Information</p></center>

        <div className="input-box">
          <label >First Name</label>
          <input type="text" placeholder="Enter First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>

        <div className="input-box">
          <label >Last Name</label>
          <input type="text" placeholder="Enter Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>

        <div className="input-box">
          <label>Personal Email Address</label>
          <input type="email" placeholder="Enter personal email address" value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)} required />
        </div>

        <center> <p className='regSub'>Company Information</p></center>

        <div className="input-box">
          <label>Company Name</label>
          <input type="text" placeholder="Enter company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </div>

        <div className="input-box">
          <label>Email Address</label>
          <input type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="input-box">
          <label>Address</label>
          <input type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>

        <div className="input-box">
          <label>Phone Number</label>
          <input type="tel" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>

        <div className="input-box">
          <label>Industry</label></div>
          <div className="select-box">
          <select value={industry} onChange={(e) => setIndustry(e.target.value)} required>
            <option hidden>Select industry</option>
                  <option>Software Development</option>
                  <option>Information Technology (IT) Services</option>
                  <option>Data Science and Analytics</option>
                  <option>Cloud Computing</option>
                  <option>Database Administration</option>
                  <option>DevOps</option>
                  <option>Quality Assurance (QA) and TestingUI/UX Design</option>
          </select>
        </div>

        <div className="input-box textarea">
          <label>Description</label>
          <textarea placeholder="Enter company description" 
          
          value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="input-box">
          <label>Website</label>
          <input type="text" placeholder="Enter website" value={website} onChange={(e) => setWebsite(e.target.value)} required />
        </div>

        <div className="column">
          <div className="input-box">
            <label>Username</label>
            <input type="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          </div>

        <div className="column">
          

          <div className="input-box">
            <label>Password</label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>

        <button type="submit">Submit</button>
        <Link to={'/Com-login'}>
          <button type="button">Log in</button>
        </Link>

      </form>
    </section>
  );
}

export default CompanyRegistration;
