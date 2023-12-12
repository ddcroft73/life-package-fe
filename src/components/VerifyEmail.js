import {React, useState, useEffect } from 'react';
import './VerifyEmail.css'; // Make sure to create a corresponding CSS file with the desired styles
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Box from "./elements/Box";

import {SERVER_HOST} from '../api/settings';
import axios from 'axios';

const VerifyEmail =  () => { //
    const location = useLocation();
    const { email } = location.state || {};

    const [message, setMessage] = useState('');
    const [cnt, setCnt] = useState(2);

    const [fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = "Verify Email Address: LifePackage 2023";
    }, []);


    const resendEmailVerification = async () => {
        const baseUrl = `http://${SERVER_HOST}/api/v1/`;
        const url = `${baseUrl}auth/resend-verification`;
        const resendLink = `${url}?email=${email}`;
        //http://192.168.12.189:8015/api/v1/auth/resend-verification?email=undefined
        
        // send the email address in the url
        try {
            // send request to resend endpoint
            //let response={};
            //response.status = 200;
            const response = await axios.put(resendLink);            

            if (response.status === 200) {
                setCnt(cnt+1);

                if (cnt < 4) {
                    setMessage(`${cnt} Emails dispatched to: ${email}...`);   
                } else {
                    setMessage("Three's the limit... you are being redirected to login.")
                    setFadeOut(true);
                    setTimeout(() => navigate("/login"), 3000);
                }                
            }
        }
        catch (error) {
            if (error.response) {
                console.error('Error status:', error.response.status);
                // Ill fix this later. 
                if (error.response.status >= 400) {  // 401, 404, 403, 409, etc
                    alert(error.response.data.detail);
                } else{
                    alert(error.response.data.detail); 
                }
            } 
        }
    };
    return (
        <div className={fadeOut ? 'fade-out' : ''}>
        <Box style={{border: "0px solid gray", maxWidth: 700, backgroundColor: "rgb(18, 17, 16)", height: 'auto', textAlign:"center"}}>
            
            <Box style={{border: "1px solid gray", color: "gray"}} className="verify-email-container">
                <Box style={{border: "0px solid black",height: 15}}>
                    {message && (
                    <Box style={{border: "0px solid black", fontSize: 14, padding: 0, color: "orange", textAlign: "center"}} className="error-message">
                        {message}
                    </Box>
                    )}
                </Box >                    
                    <h1 style={{color: "rgb(213, 208, 208)"}}><i style={{ color: 'gray'}} className="fa fa-envelope" />&nbsp;&nbsp;Please verify your email &nbsp;<i style={{ color: 'gray'}} className="fa fa-envelope-open" /></h1>

                    <Box className="verification-message" style={{textAlign: 'left', paddingTop: 20, borderTop: '0px solid gray', borderRadius: 0, color: "gray"}}>
                        Thank you for registering with us. We have sent a verification email to 
                        <span style={{padding:3, color: 'orange'}}>{email}</span>. 
                        Please check your email and click on the verification link
                        to complete your registration.
                    </Box>
                    <Box className="additional-instruction"  style={{textAlign: 'left', border: 'none', color: "gray"}}>
                        If you don't receive the email within a few minutes, please check your spam folder
                        or <span style={{cursor: "pointer",padding:3, color: 'orange'}} onClick={resendEmailVerification}>click here</span> to resend the verification email.
                    </Box>
            </Box>
        </Box>
        </div>
    );
};

export default VerifyEmail;
