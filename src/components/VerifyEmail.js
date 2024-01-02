import {React, useState, useEffect } from 'react';
import './VerifyEmail.css'; // Make sure to create a corresponding CSS file with the desired styles
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Box from "./elements/Box";
import Logo from './Logo';
import Space from './Space';
import Footer from './elements/Footer';
import {BASE_URL} from '../api/settings';
import axios from 'axios';

const VerifyEmail =  () => { //
    const location = useLocation();
    const { email } = location.state || {};

    const [message, setMessage] = useState('');
    const [cnt, setCnt] = useState(2);

    const [fadeOut, setFadeOut] = useState(false);
    const [fadeOut2, setFadeOut2] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = "Verify Email Address: Life Package 2024";
    }, []);


    const resendEmailVerification = async () => {
        const url = `${BASE_URL}auth/resend-verification`;
        const resendLink = `${url}?email=${email}`;
        //http://192.168.12.189:8015/api/v1/auth/resend-verification?email=someemail@email.com
        
        try {
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
                    setFadeOut2(true);
                    setMessage(error.response.data.detail)
                    setTimeout(() => {
                        setMessage("")
                        setFadeOut2(false);
                    }, 3900);  
                }
            } 
        }
    };
    return (
        <div className={fadeOut ? 'fade-out' : ''}>
          <Space howmuch={50} />
          <Logo />
          <Box style={{border: "0px solid gray", maxWidth: 700,  height: 'auto', textAlign:"center", marginTop: 50}}>
           
            <Box style={{border: "1px solid rgb(33,33,33)", color: "gray", backgroundColor: "rgb(12, 12, 12)"}} className="verify-email-container">

             <div className={fadeOut2 ? 'fade-out' : ''}>
                <Box style={{border: "0px solid black",height: 15}}>
                    {message && (
                    <Box style={{border: "0px solid black", fontSize: 14, padding: 0, color: "orange", textAlign: "center"}} className="error-message">
                        {message}
                    </Box>
                    )}
                </Box >   
             </div>

                    <h1 style={{color: "rgb(213, 208, 208)"}}><i style={{ color: 'gray'}} className="fa fa-envelope" />&nbsp;&nbsp;Please verify your email &nbsp;
                    </h1>

                    <Box className="verification-message" style={{textAlign: 'left', paddingTop: 20, border: '0px solid gray', borderRadius: 0, color: "gray"}}>
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
          <Footer marginTop={60}/>
        </div>
    );
};

export default VerifyEmail;
