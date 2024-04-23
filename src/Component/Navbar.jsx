import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './.../../images/03.png';
import './Navbar.css'

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-light bg-light custom-navbar">

            <span className="navbar-brand mb-0 h1">

                 <img src={logo} width="130" height="80" alt="" className="logo-container profile"/> 
            </span>
            <div>
                {location.pathname == '/'  && (
                    <Link to="/login" className="custom-button">
                        <b>Login</b>
                    </Link>
                )}
                {location.pathname == '/' && (
                    <Link to="/Reg" className="custom-button">
                        <b>Register</b>
                    </Link>
                )}
                {location.pathname == '/'  && (
                    <Link to="/mainAdmin" className="custom-button">
                        <b>Admin</b>
                    </Link>
                )}
                
                
                {location.pathname == '/' && ( /* Add this condition for the "Post a Job" button */
                    <Link to="/Com-login" className="custom-button">
                        <b>Post a Job</b>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
