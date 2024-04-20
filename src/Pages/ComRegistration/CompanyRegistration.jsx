import axios from 'axios';
import { useState } from "react";
import "./CreateAccount.css";
import { Link } from 'react-router-dom';

function CompanyRegistration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/company/add", {
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        email: email,
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
        setCompanyName("");
        setEmail("");
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
        <center> <p className='regSub'>Company Information</p></center>

        <div className="input-box">
          <label >First Name</label>
          <input type="text" placeholder="Enter First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>

        <div className="input-box">
          <label >Last Name</label>
          <input type="text" placeholder="Enter Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>

        <div className="input-box">
          <label>Company Name</label>
          <input type="text" placeholder="Enter company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </div>

        <div className="input-box">
          <label>Email Address</label>
          <input type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
            <option>IT industry</option>
            <option>Finance</option>
            <option>Banking</option>
            <option>Software Engineering</option>
            <option>Marketing</option>
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
            <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

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
