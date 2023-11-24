import "./App.css";
import Login from "./components/Login.js";
import AdminLogin from "./components/AdminLogin.js";
import LandingPage from "./components/LandingPage.js";
import TwoFactorAuth from "./components/TwoFactorAuth.js";
import UserDashboard from "./components/UserDashboard.js";
import RegisterUser from "./components/RegisterUser.js";
import PasswordRecover from "./components/PasswordRecover.js";
import VerifyEmail from "./components/VerifyEmail.js";
import React, { useEffect } from "react";
import {decodeJwt} from "./api/utils.js"
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
                    <Route path="/register" element={<RegisterUser />} />
                    <Route path="/recover-password" element={<PasswordRecover />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
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
            navigate("/landing-page");
        } else if (isExpired(token)) {
            navigate("/login");
        } else if (isAdmin(token)) {
            navigate("/admin-login");
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
