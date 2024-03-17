import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Job.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from 'E:/fullstack-project/InternshipHub_backend/campus_internshiphub_frontend/New folder/campus-internship-hub/src/images/07.gif';
import { BsBriefcaseFill, BsTrophy } from 'react-icons/bs'; // Import Bootstrap icon for building
import { Link } from 'react-router-dom';
import ChatBot from 'E:/fullstack-project/InternshipHub_backend/campus_internshiphub_frontend/New folder/campus-internship-hub/src/Component/Chatbot.jsx';

function Job() {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };


    useEffect(() => {
        axios.get('http://localhost:8080/job')
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }, []);

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent form submission
        axios.get(`http://localhost:8080/job/search?query=${searchQuery}`)
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('Error searching jobs:', error);
            });
    };



    return (
        <div>

            <header className="masthead">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="site-heading">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{ paddingRight: '100px' }}>
                                                <h1 className="heading">
                                                    Dream Career Awaits.
                                                </h1>
                                                <span className="subheading">
                                                    Your dream job is just a click away. Start exploring today!
                                                </span>
                                            </td>
                                            <td><img className='image-job img-fluid zoom-hover' src={image} alt="Image" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>

                <div className="msgbutton-container">
                    <button class="msgbutton" onClick={handleModalToggle}>
                        Chat
                    </button>
                    <span class="msgbackdrop"></span>

                </div>
                <div>
                    {/* Modal */}
                {showModal && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" >
                            <div className="modal-content mcontent">
                                <div className="modal-header">
                                    <button type="button" className="btn-close close" onClick={handleModalToggle} aria-label="Close">

                                    </button>
                                </div>
                                <div className="modal-body">
                                    <ChatBot />
                                </div>

                            </div>
                        </div>
                    </div>
                )}
                {/* Modal backdrop */}
                {showModal && <div className="modal-backdrop fade show"></div>}
                </div>
            </header>
            <div></div>

            

            <section>
            <nav className="navbar navbar-light bg-light search-bar">
                <form className="form-inline" onSubmit={handleSearch}>
                    <div className="row">
                        <div className="col">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchQuery(e.target.value)} />
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-outline-secondary my-2 my-sm-0 search-button" type="submit">Search</button>
                        </div>
                    </div>


                </form>
            </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <ul className="job-list">
                                {jobs.map(job => (
                                    <li className="job-preview" key={job.id}>
                                        <div >
                                            <h4 className="job-title">
                                                <i className="bi bi-building company-icon"></i>
                                                <BsBriefcaseFill className="company-icon" />&nbsp;&nbsp;{job.title}
                                            </h4>
                                            <h6 className="company">
                                                {job.company}
                                            </h6>
                                            <h5 className="company">
                                                {job.description}
                                            </h5>
                                            <h5 className="company">
                                                {job.skills}
                                            </h5>
                                        </div>
                                        <Link to={`/CVUpload/${job.title}`} className="btn btn-apply float-sm-right float-xs-left"> {/* Update the link */}
                                            Apply
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        
        </div>
    );
}

export default Job;
