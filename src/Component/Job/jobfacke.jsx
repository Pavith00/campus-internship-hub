import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Job.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link from React Router

function Job() {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/job')
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }, []);

    const handleSearch = () => {
        axios.get(`http://localhost:8080/job/${searchQuery}`)
            .then(response => {
                setJobs([response.data]);
            })
            .catch(error => {
                console.error('Error searching jobs:', error);
            });
    };

    return (
        <div>
            <nav className="navbar navbar-light bg-light custom-navbar">
                <span className="navbar-brand mb-0 h1">  <b>  JobVoyege</b></span>
                <div>
                    
                <Link to="/" className="btn btn-outline-secondary m-3 custom-button"><b>Login</b></Link>
                    <button type="button" className="btn btn-outline-secondary m-3 custom-button"><b>Register</b></button>
                </div>
            </nav>

            <nav className="navbar navbar-light bg-light position-fixed" style={{ zIndex: '1000', top: '56px' }}>
                <form className="form-inline" onSubmit={handleSearch}>
                    <div className="row">
                        <div className="col">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchQuery(e.target.value)}/>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </div>
                    </div>
                </form>
            </nav>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <ul className="job-list">
                                {jobs.map(job => (
                                    <li className="job-preview" key={job.id}>
                                        <div className="content float-left">
                                            <h4 className="job-title">
                                                {job.title}
                                            </h4>
                                            <h5 className="company">
                                                {job.description}
                                            </h5>
                                        </div>
                                        <a href="#" className="btn btn-apply float-sm-right float-xs-left">
                                            Apply
                                        </a>
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
