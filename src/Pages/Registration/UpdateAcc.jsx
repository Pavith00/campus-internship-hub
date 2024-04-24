import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./CreateAccount.css";

function UpdateAcc() {
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    address: "",
    username: "",
    university: "",
    gradOrUn: "",
    yearThatGraduate: "",
    path: "",
    degree: "",
    department: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem('username');
      if (username) {
        try {
          const response = await axios.get(`http://localhost:8080/student/${username}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/student/${userData.username}`, userData);
      console.log(response.data);
      if (response.data.startsWith("Username")) {
        alert(response.data);
      } else {
        alert("User updated successfully");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating user");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <section className="container" style={{ backgroundColor: 'white', width: '600px' }}>
      <center><header className='RegHead'>Update Account Information</header></center>
      <form className="form" onSubmit={handleSubmit}>
        <center><p className='regSub'>Personal Information</p></center>
        <div className="input-box">
          <label >First Name</label>
          <input type="text" name="fname" placeholder="Enter First name" value={userData.fname} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label >Last Name</label>
          <input type="text" name="lname" placeholder="Enter Last name" value={userData.lname} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Email Address</label>
          <input type="email" name="email" placeholder="Enter email address" value={userData.email} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="Enter phone number" value={userData.phone} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Birth Date</label>
          <input type="date" name="birthday" value={userData.birthday} onChange={handleChange} required />
        </div>

        
      
        

        <div className="input-box address">
          <label>Address</label>
          <input type="text" name="address" placeholder="Enter street address" value={userData.address} onChange={handleChange} required />
        </div>

        <div className="gender-box">
          <h3>Gender</h3>
          <div className="gender-option">
            <div className="gender">
              <input type="radio" id="check-male" name="gender" value="male" checked={userData.gender === "male"} onChange={handleChange} />
              <label htmlFor="check-male">Male</label>
            </div>
            <div className="gender">
              <input type="radio" id="check-female" name="gender" value="female" checked={userData.gender === "female"} onChange={handleChange} />
              <label htmlFor="check-female">Female</label>
            </div>
          </div>
        </div>

        <center><p className='regSub'>Educational Information</p></center>

        <div className="input-box">
          <label>University</label>
          <div className="select-box">
            <select name="university" value={userData.university} onChange={handleChange} required>
              <option hidden>Select university</option>
              <option>University of Kelaniya</option>
                <option>University of Peradeniya</option>
                <option>University of Jayawardhanapura</option>
                <option>University of Colombo</option>
            </select>
          </div>
        </div>

        <div className="gender-option">
          <div className="gender">
            <input type="radio" id="check-graduate" name="gradOrUn" value="Graduate" checked={userData.gradOrUn === "Graduate"} onChange={handleChange} />
            <label htmlFor="check-graduate">Graduate</label>
          </div>
          <div className="gender">
            <input type="radio" id="check-undergraduate" name="gradOrUn" value="Undergraduate" checked={userData.gradOrUn === "Undergraduate"} onChange={handleChange} />
            <label htmlFor="check-undergraduate">Undergraduate</label>
          </div>
        </div>

        <div className="input-box">
          <label>Year that Graduate</label>
          <input type="text" name="yearThatGraduate" placeholder="Enter year name" value={userData.yearThatGraduate} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Degree</label>
          <input type="text" name="degree" placeholder="Enter degree name" value={userData.degree} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Department</label>
          <input type="text" name="department" placeholder="Enter department name" value={userData.department} onChange={handleChange} required />
        </div>

        <div className="input-box">
          <label>Path</label>
          <div className="select-box">
            <select name="path" value={userData.path} onChange={handleChange} required>
              <option hidden>Select Path</option>
              <option>Software Development</option>
                  <option>Information Technology (IT) Services</option>
                  <option>Data Science and Analytics</option>
                  <option>Cloud Computing</option>
                  <option>Database Administration</option>
                  <option>DevOps</option>
                  <option>Quality Assurance (QA) and TestingUI/UX Design</option>
            </select>
          </div>
        </div>
        
        <button type="submit">Update</button>
        <Link to={'/profile'}>
          <button type="button">Cancel</button>
        </Link>
      </form>
    </section>
  );
}

export default UpdateAcc;
