import "./App.css";
import Login from "./components/Login.js";
import AdminLogin from "./components/AdminLogin.js";
import LandingPage from "./components/LandingPage.js";
import TwoFactorAuth from "./components/TwoFactorAuth.js";
import UserDashboard from "./components/UserDashboard.js";
import UserRegistration from "./components/UserRegistration.js";
import RegisterUser from "./components/RegisterUser.js";
import PasswordRecover from "./components/PasswordRecover.js";

import PasswordReset from "./components/PasswordReset.js";

import AdminDashboard from "./components/AdminDashboard.js";
import VerifyEmail from "./components/VerifyEmail.js";
import React, { useEffect } from "react";
import {decodeJwt} from "./api/utils.js";
import ThemeManager from "./theme/ThemeManager";

import {
    Routes,
    Route,
    BrowserRouter as Router,
    useNavigate,
} from "react-router-dom";


const App = () => {
    
    return (
        <ThemeManager>
            <Router>
                <Routes>
                    <Route path="/" element={<TokenHandler />} />
                    <Route path="/landing-page" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<UserRegistration />} />
                    <Route path="/recover-password" element={<PasswordRecover />} />
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Routes>
            </Router>
        </ThemeManager>
    );
};


function TokenHandler() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("LifePackage"));
        const token = userData ? userData.access_token : null;

        if (!token) {
            navigate("/landing-page");  //Debug landing-page

        } else if (isExpired(token)) {
            navigate("/login");
        } else if (isAdmin(token)) {            
            const adminData = JSON.parse(localStorage.getItem("adminToken")) || {};
            const adminToken = adminData ? adminData.token : null;                  
            if (adminToken) {
                if (isExpired(adminToken)) {
                    navigate("/admin-login");
                } else {
                    navigate("/admin-dashboard");
                }                
            } else {
                navigate("/admin-login");
            }
        } else {
            navigate("/user-dashboard");
        }
    }, []);

    function isExpired(token) {
        function isExpired_(expTimestamp) {
            const currentTime = Math.floor(Date.now() / 1000); // Convert current time to UNIX timestamp in seconds
            return expTimestamp <= currentTime;
        }
        const decodedPayload = decodeJwt(token);
        const { exp } = decodedPayload;        
        return isExpired_(exp); 
    }

    function isAdmin(token) {
        const decodedPayload = decodeJwt(token);
        const { user_role } = decodedPayload;
        return user_role === 'admin' ? true : false ; 
    }

    return null; // This component doesn't render anything
}

export default App;
