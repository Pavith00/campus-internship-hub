// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/Login';
import Profile from './Component/Profile/profile';
import Job from './Component/Job/Job';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import CVUpload from './Component/CVUpload/CVUpload';
import ChatBot from './Component/Chatbot/Chatbot';

function App() {
    return (
        <Router>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Routes>
                    {/* Place Login component in the middle of the page */}
                    <Route
                        path="/login"
                        element={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <Login />
                            </div>
                        }
                    />
                    {/* Include navbar and footer on all other pages */}
                    <Route
                        path="/*"
                        element={
                            <>
                                <Navbar/>
                                <div style={{ flex: '1' }}>
                                    <Routes>
                                        <Route path="/" element={<Job />} />
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/CVUpload/:jobTitle" element={<CVUpload />} />
                                        <Route path="/chatbot" element={<ChatBot />} />
                                    </Routes>
                                </div>
                                <Footer/>
                            </>
                        }
                    />
                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;
