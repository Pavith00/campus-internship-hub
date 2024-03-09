import axios from 'axios';
import { useState } from "react";
import "./CreateAccount.css";



function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [university, setUniversity] = useState("");
  const [gradOrUn, setGradOrUn] = useState("");
  const [yearThatGraduate, setYearThatGraduate] = useState("");
  const [path, setPath] = useState("");
  const [degree, setDegree] = useState("");
  const [department, setDepartment] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/student/add", {
        name: name,
        email: email,
        phone: phone,
        birthday: birthday,
        gender: gender,
        address: address,
        password:password,
        username:username,
        university: university,
        gradOrUn: gradOrUn,
        yearThatGraduate: yearThatGraduate,
        path: path,
        degree: degree,
        department: department
      });
      console.log(response.data);
      alert("User registered successfully");
      // Reset form fields after successful registration
      setName("");
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
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering user");
    }
  };


  return (
    
    <section className="container">  
      
      <header>Registration Form</header>

      <form className="form" onSubmit={handleSubmit}>
        
        <p>Personal Information</p>
        <div className="input-box">
          <label >Full Name</label>
          <input type="text" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} required />
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
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            
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

        <p>Educational Information</p>
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
          <label >Degree</label>
          <input type="text" placeholder="Enter Degree name" value={degree} onChange={(e) => setDegree(e.target.value)} required />
        </div>

        <div className="input-box">
          <label >Department</label>
          <input type="text" placeholder="Enter Department name" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        </div>

        <div className="input-box">
          <label >Path</label>
          <input type="text" placeholder="Enter Path" value={path} onChange={(e) => setPath(e.target.value)} required />
        </div>


        
        
        <button type="submit">Submit</button>
      </form>
      
    </section>
    
  );
}

export default CreateAccount;
