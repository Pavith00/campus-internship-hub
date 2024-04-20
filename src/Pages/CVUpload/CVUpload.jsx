import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CVUpload.css';

function CVUpload() {
    const [file, setFile] = useState(null);
    const [uploadedCV, setUploadedCV] = useState(null);
    const [job, setJob] = useState(null);
    const { jobTitle } = useParams();
    const [name, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [degree, setDegreeProgram] = useState('');
    const [description, setShortDescription] = useState('');
    const [userJobTitle, setUserJobTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [companyName, setCompanyName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to fetch user information including job title
    const fetchUserInfo = async () => {
        try {
            // Fetch user info from backend API
            const response = await axios.get('http://localhost:8080/user-info');
            setUserJobTitle(response.data.jobTitle); // Set user's job title
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };

    useEffect(() => {
        // Fetch job details based on jobTitle
        axios.get(`http://localhost:8080/job/${jobTitle}`)
            .then(response => {
                setJob(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching job details:', error);
            });
            
    }, [jobTitle]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || !name || !email || !degree || !description || !userJobTitle) {
            console.error('Please fill in all fields.');
            return;
        }
        const formData = new FormData();
        formData.append('firstName', name);
        formData.append('email', email);
        formData.append('degreeProgram', degree);
        formData.append('shortDescription', description);
        formData.append('jobTitle', userJobTitle); // Append job title to the form data
        formData.append('companyName', companyName);
        formData.append('file', file);

        try {
            // Upload CV
            const response = await axios.post('http://localhost:8080/cv/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('CV uploaded:', response.data);
            setUploadedCV(response.data); // Save the uploaded CV details
            setSuccessMessage('CV uploaded successfully.');
        } catch (error) {
            console.error('Error uploading CV:', error);
        }
    };

    const handleDownloadCV = async () => {
        if (!uploadedCV) {
            console.error('No CV uploaded.');
            return;
        }
        try {
            // Download CV
            const response = await axios.get(`http://localhost:8080/cv/${uploadedCV.id}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', uploadedCV.fileName);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading CV:', error);
        }
    };

    if (loading || !job) {
        return <div>Loading job details...</div>;
    }

    return (
        <center>
            <div className='blankk'></div>
            <div className='content'>
                <div class="CVcard">
                    <div class="CVcard-body">
                        <h2 className='color'>{job.title}</h2>
                        <p>Company: {job.company}</p>
                        <p>Description: {job.description}</p>
                        <p>Skills: {job.skills}</p>

                        <form onSubmit={handleSubmit}>
                            <div className="col-sm-6">
                                <label htmlFor="firstNameInput" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstNameInput"
                                    placeholder="Enter your first name"
                                    value={name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Add similar inputs for other fields */}
                            <div className="col-sm-6">
                            <label htmlFor="emailInput" className="form-label">Email</label>
                            <input 
                            type="email" 
                            className="form-control" 
                            id="emailInput" 
                            placeholder="Enter your email address" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            />
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="degreeProgramInput" className="form-label">Degree Program</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="degreeProgramInput" 
                            placeholder="Enter your degree program" 
                            value={degree} 
                            onChange={(e) => setDegreeProgram(e.target.value)} 
                            required 
                            />
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="shortDescriptionInput" className="form-label">About you</label>
                            <textarea 
                            className="form-control" 
                            id="shortDescriptionInput" 
                            placeholder="Enter a short description about yourself" 
                            value={description} 
                            onChange={(e) => setShortDescription(e.target.value)} 
                            required 
                            />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="companyNameInput" className="form-label">Company Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="companyNameInput" 
                                placeholder="Enter your company name" 
                                value={companyName} 
                                onChange={(e) => setCompanyName(e.target.value)} 
                                required 
                            />
                        </div>

                        {/* Input for job title */}
                        <div className="col-sm-6">
                            <label htmlFor="jobTitleInput" className="form-label">Job Title</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="jobTitleInput" 
                            placeholder="Enter your job title" 
                            value={userJobTitle} 
                            onChange={(e) => setUserJobTitle(e.target.value)} 
                            required 
                            />
                        </div>
                       
                       

                        <h2>Upload CV</h2>
                        <p>Rename your CV with your name and username ex:John-username</p>
                        
                            <div class="col-sm-6">
                                <input type="file" onChange={handleFileChange} class="form-control transparent-file-input" />
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>

                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                        {uploadedCV && (
                            <div>
                                <br></br>
                                <h3>Uploaded CV:</h3>
                                <p>{uploadedCV.fileName}</p>
                                <button onClick={handleDownloadCV} className="btn btn-outline-secondary">Download CV</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </center>
    );
}

export default CVUpload;
