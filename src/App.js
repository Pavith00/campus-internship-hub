// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Profile from './Pages/Profile/profile';
import Job from './Pages/Job/Job';
import CVUpload from './Pages/CVUpload/CVUpload';
import ChatBot from './Pages/Chatbot/Chatbot';
import QuizAttempt from './Pages/QuizAttempt/QuizAttempt';
import QuizUpload from './Pages/QuizUpload/QuizUpload';
import CreateAccount from './Pages/Registration/CreateAccount';
import Login from './Pages/Login/Login';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import ComLogin from './Pages/ComLogin/ComLogin';
import CompanyRegistration from './Pages/ComRegistration/CompanyRegistration';
import ComProfile from './Pages/ComProfile/ComProfile';
import Postjob from './Pages/ComProfile/Postjob';
import Candidates from './Pages/ComProfile/Canditade';
import AdminForm from './Pages/AdminRegistration/AdminForm';
import AdminLogin from './Pages/AdminRegistration/AdminLogin';
import AdminProfile from './Pages/AdminRegistration/AdminProfile';
import MainAdminLogin from './Pages/AdminRegistration/MainAdminLogin';


function App() {
    return (
        <Router>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Routes>
                    {/* Place Login component in the middle of the page */}
                    <Route
                        path="/admin"
                        element={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <AdminForm/>
                            </div>
                        }
                    />
                    <Route
                        path="/adminLogin"
                        element={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <AdminLogin/>
                            </div>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <Login/>
                            </div>
                        }
                    />
                    <Route
                        path="/Reg"
                        element={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <CreateAccount />
                            </div>
                        }
                    />
                    <Route
                        path="/post-job"
                        element={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <CompanyRegistration/>
                            </div>
                        }
                    />
                    
                    <Route
                        path="/com-login"
                        element={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <ComLogin/>
                            </div>
                        }
                    />
                    <Route
                        path="/*"
                        element={
                            <>
                                <Navbar />
                                <div style={{ flex: '1' }}>
                                    <Routes>
                                        <Route path="/" element={<Job />} />
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/com-profile" element={<ComProfile/>} />
                                        <Route path="/CVUpload/:jobTitle" element={<CVUpload />} />
                                        <Route path="/postjob" element={<Postjob/>} />
                                        <Route path="/chatbot" element={<ChatBot />} />
                                        <Route path="/quizupload" element={<QuizUpload />} />
                                        <Route path="/quizattempt" element={<QuizAttempt />} />
                                        <Route path="/candidates" element={<Candidates />} />
                                        <Route path="/adminProfie" element={<AdminProfile />} />
                                        <Route path="/mainAdmin" element={<MainAdminLogin />} />
                                        
                                        
                                    </Routes>
                                </div>
                                <Footer />
                            </>
                        }
                    />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
