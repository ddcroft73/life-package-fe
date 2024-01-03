
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
import Modal from './Modal.js';
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

    // Modal State
    const [modalConfig, setModalConfig] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);    
    const [fadeOut, setFadeOut] = useState(false);
    const [fadeOut2, setFadeOut2] = useState(false);


    const navigate = useNavigate();
    
        // Predefined actions
        const confirmAction = () =>  navigate('/login'); 
        const cancelAction = () => setIsModalVisible(false);
        
        // Function to show modal with OK button, just for message
        const showMessageModal = (content, borderColor) => {
            setModalConfig({
            content,
            buttons: [
                { text: 'OK', handler: cancelAction }
            ],
            borderColor: borderColor
            });
            setIsModalVisible(true);
        };
    
        // Function to program modal for an action on OK
        const showConfirmModal = (content, borderColor) => {
            setModalConfig({
            content,
            buttons: [
                { text: 'OK', handler: confirmAction },
                //{ text: 'Cancel', handler: cancelAction }
            ],
            borderColor: borderColor
            });
            setIsModalVisible(true);
        };
    
    // Request to validate the token, Once validated the 
    // DB will be updated so the user can now login

    /**
     * 
     * BUG LOCATED
     *  For some reason fetchData inside useEffect is being called a lot. I need to figure out what is causing this component to keep 
     * loading... 
     * 
     */
    useEffect(  ()  => {        
        async function fetchData() {
            
            try {
                const verifyEmailEndPoint = `${BASE_URL}/auth/verify-email?token=${token}`;
                const response = await axios.get(verifyEmailEndPoint);               
                const {msg} = response.data;

              
                console.log(response.status);
                if (msg) {
                    // load login or
                    // load a modal proclaiming success... the latter
                    let currContent = (
                        <>
                          <div style={{width:"100%", padding:0, color: "white", marginBottom: 15}}>
                            <div style={{
                                        width: "100%", backgroundColor: "rgba(0,0,0,0.600)", textAlign: "center", 
                                        borderLeft: `2px solid orange`, borderRadius: 15, paddingLeft: 8, paddingBottom: 0}}>          
                              <h2>Success!</h2>
                            </div>       
                          </div>
                          <Box style={{
                            width:"100%", 
                            padding:0, 
                            color: "white",
                            border: "0px solid black"}}>       
                             Thank you for verifying your email address. Click Ok to be taken to the login page,
                              
                          </Box>
                        </>
                      );
                      showConfirmModal(currContent, "blue"); 
                }
              }
              catch(error) {
                console.log(error)
                if (error.response) {
                    console.error('Error status:', error.response.status);
            
                    if (error.response.status >= 400) {  // 401, 404, 403, 409, etc
                        let currContent = (
                            <>
                              <div style={{width:"100%", padding:0, color: "orange"}}>
                                <div style={{
                                            width: "100%", backgroundColor: "rgba(0,0,0,0.600)", textAlign: "center", 
                                            borderLeft: `0px solid orange`, borderRadius:5, paddingLeft: 8, paddingBottom: 0}}>          
                                  <h2>Error verifying email</h2>
                                </div>       
                              </div>
                              <Box style={{
                                width:"100%", 
                                padding:0, 
                                color: "white",
                                border: "0px solid black", textAlign: "center"}}>       
                                    {error.response.data.detail}                   
                              </Box>
                            </>
                          );
                        showMessageModal(currContent, "orange");    
                    }
                }                               

              }
        };
           
        if (token ) {
            fetchData();     
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
                <Modal
                  show={isModalVisible}
                  content={modalConfig.content}
                  buttons={modalConfig.buttons}
                  borderColor={modalConfig.borderColor}
                />

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