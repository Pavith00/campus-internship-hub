import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Job.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import image from '../images/07.gif';

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

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent form submission
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
                                            <td><img className='image-job' src={image} alt="Image" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="navbar navbar-light bg-light search-bar">
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
