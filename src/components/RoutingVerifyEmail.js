
import React , { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation} from "react-router-dom";
import { isEmailAddress, decodeJwt, isTokenExpired, convertUnixTo24Hour } from '../api/utils.js';
import { BASE_URL } from '../api/settings.js';
import Box from "./elements/Box.js";
import Button from "./elements/Button.js";
import TextBox from './elements/TextBox.js';
import Logo from './Logo.js';
import Footer from './elements/Footer.js';
import Oauth from './Oauth.js';
import Links from './Links.js';
import axios from 'axios';

/**
 * 
 *  This component recieves a request from a users email to verify their email address. 
 *  A token is sent in with the URL THe token is send to the server where it is evaluated.
 *  A response is sent bacl to let the CClient lnow how to react
 * 
 */


function RoutingVerifyEmail ()  {
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    
    const [modalConfig, setModalConfig] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(  ()  => {        
        async function fetchData() {
            // You can await here
            try {
                const verifyEmailEndPoint = `${BASE_URL}/auth/verify-email?token=${token}`;
                const response = await axios.get(verifyEmailEndPoint);               
                const {msg} = response.data;
                
                if (msg) {
                    // load login
                    // load a modal prclaiming success
                    //navigate("/login"); 
                }
              }
              catch(error) {
                console.log(error)
                if (error.response) {
                    console.error('Error status:', error.response.status);
            
                    if (error.response.status >= 400) {  // 401, 404, 403, 409, etc
                               
                    }
                }                               

           }
        };
           
        if (token && !isTokenExpired(token)) {
            fetchData();              
        } else {
            console.log("token has expired or is invalid")
        }          

    }, []);

    return(
        <>
            <Box style={{
                   display: "flex",
                   flexDirection: "column",
                   minWidth: 290,
                   maxWidth: 600,
                   width: "100%",
                   height: "auto",
                   justifyContent: "center",
                }}
            >

            </Box>
        </>
    );
};

export default RoutingVerifyEmail;


/**
 * 
              console.log("Token is still good");
               const tokenPayload = decodeJwt(token);
               const email = tokenPayload.email;
               const nbfTime = convertUnixTo24Hour(tokenPayload.nbf);
               const expTime = convertUnixTo24Hour(tokenPayload.exp);

               console.log(`Token info: email: ${email}, exp: ${expTime}, nbf: ${nbfTime}`)
 */