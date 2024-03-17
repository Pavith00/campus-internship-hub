import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CVUpload.css'

function CVUpload() {
    const [file, setFile] = useState(null);
    const [uploadedCV, setUploadedCV] = useState(null);
    const [job, setJob] = useState(null);
    const { jobTitle } = useParams();

    useEffect(() => {
        // Fetch job details based on jobTitle
        axios.get(`http://localhost:8080/job/${jobTitle}`)
            .then(response => {
                setJob(response.data);
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
        const formData = new FormData();
        formData.append('file', file);
        try {
            // Upload CV
            const response = await axios.post('http://localhost:8080/cv/upload', formData);
            console.log('CV uploaded:', response.data);
            setUploadedCV(response.data); // Save the uploaded CV details
        } catch (error) {
            console.error('Error uploading CV:', error);
        }
    };

    const handleDownloadCV = async () => {
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

    if (!job) {
        return <div>Loading job details...</div>;
    }

    return (
        <center>
            <div className='blankk'></div>
            <div className='content'>

                <div class="card">
                    <div class="card-body">
                        <h2>{job.title}</h2>
                        <p>Company: {job.company}</p>
                        <p>Description: {job.description}</p>
                        <p>Skills: {job.skills}</p>


                        <h2>Upload CV</h2>
                        <p>Rename your CV with your name and username ex:John-username</p>
                        

                        <form onSubmit={handleSubmit} class="row align-items-center">
                            <div class="col-sm-6">
                                <input type="file" onChange={handleFileChange} class="form-control transparent-file-input" />
                            </div>
                            <div class="col-sm-6">
                                <button type="submit" class="btn btn-outline-secondary">Upload</button>
                            </div>
                        </form>


                        {uploadedCV && (
                            <div>
                                <br></br>
                                <h3>Uploaded CV:</h3>
                                <p>{uploadedCV.fileName}</p>
                                <button onClick={handleDownloadCV} class="btn btn-outline-secondary">Download CV</button>
                            </div>
                        )}
                    </div> </div> </div>
        </center>
    );
}

export default CVUpload;
