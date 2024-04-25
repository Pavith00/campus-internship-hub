import axios from 'axios';
import { useState } from "react";
import "./CreateAccount.css";
import { Link, Navigate } from 'react-router-dom';


function CreateAccount() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [rawPassword, setRawPassword] = useState("");
  const [username, setUsername] = useState("");

  const [university, setUniversity] = useState("");
  const [gradOrUn, setGradOrUn] = useState("");
  const [yearThatGraduate, setYearThatGraduate] = useState("");
  const [path, setPath] = useState("");
  const [degree, setDegree] = useState("");
  const [department, setDepartment] = useState("");

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
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number (10 digits only)");
      return;
    }

    // Regular expression for password validation (minimum 6 characters)
  const passwordRegex = /^.{6,}$/;

  // Check if password meets minimum length requirement
  if (!passwordRegex.test(rawPassword)) {
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
      const response = await axios.post("http://localhost:8080/student/add", {
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        birthday: birthday,
        gender: gender,
        address: address,
        rawPassword:rawPassword,
        username:username,
        university: university,
        gradOrUn: gradOrUn,
        yearThatGraduate: yearThatGraduate,
        path: path,
        degree: degree,
        department: department
      });
      console.log(response.data);
      if (response.data.startsWith("Username")) {
        alert(response.data);
      } else { alert("User registered successfully");
      // Reset form fields after successful registration
      setFname("");
      setLname("");
      setEmail("");
      setPhone("");
      setBirthday("");
      setGender("");
      setAddress("");
      setUniversity("");
      setGradOrUn("");
      setYearThatGraduate("");
      setPath("");
      setDegree("");
      setDepartment("");
    }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering user");
    }
  };


  return (
    
    <section className="container" style={{backgroundColor:'white', width:'600px'}}>  
      
      <center><header className='RegHead'>Registration Form</header></center>

      <form className="form" onSubmit={handleSubmit}>
        
       <center> <p className='regSub'>Personal Information</p></center>
        <div className="input-box">
          <label >First Name</label>
          <input type="text" placeholder="Enter First name" value={fname} onChange={(e) => setFname(e.target.value)} required />
        </div>

        <div className="input-box">
          <label >Last Name</label>
          <input type="text" placeholder="Enter Last name" value={lname} onChange={(e) => setLname(e.target.value)} required />
        </div>

        <div className="input-box">
          <label>Email Address</label>
          <input type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-box">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="input-box">
            <label>Birth Date</label>
            <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
          </div>

        <div className="column">
          <div className="input-box">
            <label>Username</label>
            <input type="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-box">
            <label>Password</label>
            <input type="password" placeholder="Enter Password" value={rawPassword} onChange={(e) => setRawPassword(e.target.value)} required />
            
          </div>
        </div>
        <div className="input-box address">
          <label>Address</label>
          <input type="text" placeholder="Enter street address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="gender-box">
          <h3>Gender</h3>
          <div className="gender-option">
            <div className="gender">
              <input type="radio" id="check-male" name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} />
              <label htmlFor="check-male">male</label>
            </div>
            <div className="gender">
              <input type="radio" id="check-female" name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} />
              <label htmlFor="check-female">Female</label>
            </div>
          </div>
        </div>
        <br></br>

        <center><p className='regSub'>Educational Information</p></center>
        <div className="input-box">
          <label>University</label>
            <div className="select-box">
        
              <select value={university} onChange={(e) => setUniversity(e.target.value)} required>
                <option hidden>university</option>
                <option>University of Kelaniya</option>
                <option>University of Peradeniya</option>
                <option>University of Jayawardhanapura</option>
                <option>University of Colombo</option>
              </select>
            </div>
        </div>
        <br></br>
        <div className="gender-option">
            <div className="gender">
              <input type="radio" id="check-Graduate-Undergraduate" name="Graduate-Undergraduate" value="Graduate" checked={gradOrUn === "Graduate"} onChange={(e) => setGradOrUn(e.target.value)} />
              <label htmlFor="check-Graduate-Undergraduate">Graduate</label>
            </div>
            <div className="gender">
              <input type="radio" id="check-Graduate-Undergraduate" name="Graduate-Undergraduate" value="Undergraduate" checked={gradOrUn === "Undergraduate"} onChange={(e) => setGradOrUn(e.target.value)} />
              <label htmlFor="check-Graduate-Undergraduate">Undergraduate</label>
            </div>
         </div>

         <div className="input-box">
          <label >Year that Graduate</label>
          <input type="text" placeholder="Enter year name" value={yearThatGraduate} onChange={(e) => setYearThatGraduate(e.target.value)} required />
        </div>

         <div className="input-box">
          <label >Degree</label>
          <input type="text" placeholder="Enter Degree name" value={degree} onChange={(e) => setDegree(e.target.value)} required />
        </div>

        <div className="input-box">
          <label >Department</label>
          <input type="text" placeholder="Enter Department name" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        </div>

        

        <div className="input-box">
  <label>Path</label>
  <div className="select-box">
    <select value={path} onChange={(e) => setPath(e.target.value)} required>
      <option hidden>Select Path</option>
      <option selected >Choose the Industry</option>
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


        


        
        
        <button type="submit">Submit</button>
        <Link to={'/login'}>
        <button type="button">Log in</button>
        </Link>
      </form>
      
    </section>
    
  );
}

export default CreateAccount;
