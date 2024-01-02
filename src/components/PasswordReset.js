import Box from "./elements/Box.js";

import { useLocation, Link, useNavigate } from 'react-router-dom';
import Button from "./elements/Button.js";
import TextBox from "./elements/TextBox.js";
import Space from "./Space.js";
import Logo from "./Logo.js";
import Footer from "./elements/Footer.js";
import { useState, useEffect } from 'react';
import { verifyPasswordStrength, decodeJwt } from "../api/utils.js";
import { BASE_URL } from "../api/settings.js";


import Links from "./Links.js";
import Modal from "./Modal.js";
import axios from "axios";
      



const PasswordReset = () => {
  
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modalConfig, setModalConfig] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [message, setMessage] = useState('');
    const [fadeOut2, setFadeOut2] = useState(false);

    const navigate = useNavigate();

    let sendRequest = true;    
    

    useEffect(() => {
        document.title = "Reset Password: Life Package 2024";
         
    }, []); 


// MODAL FUNCTIONS
    const successAction = () =>  navigate('/login'); 
    const okAction = () => setIsModalVisible(false);        
    const showMessageModal = (content, borderColor) => {
        setModalConfig({
        content,
        buttons: [
            { text: 'OK', handler: okAction }
        ],
        borderColor: borderColor
        });
        setIsModalVisible(true);
    };

    const showSuccessModal = (content, borderColor) => {
        setModalConfig({
        content,
        buttons: [
            { text: 'OK', handler: successAction }
        ],
        borderColor: borderColor
        });
        setIsModalVisible(true);
    };

// HANDLERS
    const handleNewPassword = (value) => {
        setNewPassword(value);
    };
    const handleConfirmPassword = (value) => {
        setConfirmPassword(value);
    };
      
    /**
     * 
     * THis component is invoked ONLY when the user clicks a link in a message the server previously sent
     * In doing this there will be a token riding in on the URL so that token is expected when the user 
     * tries to reset the password
     */
    const sendResetPasswordRequest = async () => {
        
        if (token) {
            // do validation:
            if (newPassword === "" || confirmPassword === "") {
                setMessage("Passwords cannot be blank.");     
                setFadeOut2(true); 
                setTimeout(() => {
                setMessage('')
                setFadeOut2(false)
                }, 3900);

                sendRequest = false;
            }
            else if (newPassword !== confirmPassword) {
                setMessage("Passwords do not match.");     
                setFadeOut2(true); 
                setTimeout(() => {
                setMessage('')
                setFadeOut2(false)
                }, 3900);

                sendRequest = false;

            } else if (newPassword === confirmPassword) {          
                console.log("checking strength")        

                const passwordResult = verifyPasswordStrength(newPassword); 

                if (passwordResult.length > 0) {           
                    let currContent = (
                    <>
                        <div style={{width:"100%", padding:0, color: "orange"}}>
                            <div style={{
                                width: "100%", backgroundColor: "rgba(0,0,0,0.600)", textAlign: 'center',
                                borderLeft: `0px solid orange`, paddingLeft: 5, paddingBottom: 0}}>
                            <h2>Bad Password</h2>
                            </div>                    
                        </div>
                        <Box style={{
                        width:"100%", 
                        padding:0, 
                        color: "gray",
                        border: "0px solid black"}}>         
                            Satisfy the following issues with your password:<br />          
                            <ul>
                            {passwordResult.map((item, key) => (
                                <li><span style={{color:"white"}}>{item}</span></li>
                            ))}
                            </ul>

                        </Box>
                    </>
                    );

                    showMessageModal(currContent, "orange");      
                    sendRequest = false;      
                }
            }
            
            // Everything should be good to go
            if (sendRequest) {
                const endPoint = `${BASE_URL}/auth/reset-password?token=${token}`;                               
                const payload = {
                    new_password: newPassword
                };
                
                try {
                 /*
                    let response = {
                        data: {
                            msg: `User: fakeEmail@email.com successfully updated their password.`
                        }
                    };
                    response.status = 403;
                 */

                    const response = await axios.post(endPoint, payload);
                    const { msg } = response.data;
                    
                    if (response.status === 200) {        // ALL GOOD
                        
                        let successContent = (
                            <>
                                <div style={{
                                        width:"100%", 
                                        padding:0, 
                                        color: "white", 
                                        textAlign: "center"
                                    }}>
                                        <h2>Success</h2>
                                </div>
                                <Box style={{
                                        width:"100%", 
                                        padding:0, 
                                        color: "gray",
                                        border: "0px solid black"
                                    }}>   
                                        {msg}                                                   
                                </Box>
                            </>
                        );

                        showSuccessModal(successContent, "blue");
                    } 
                    else if (response.status === 403) {     // INVALID TOKEN
                    // invalid token
                    let currContent = (
                        <>
                            <div style={{
                                    width:"100%", 
                                    padding:0, 
                                    color: "orange", 
                                    textAlign: "center"
                                }}
                                >
                                    <h2>Your reset token is invalid...</h2>
                                </div>
                            <Box style={{
                                    width:"100%", 
                                    padding:0, 
                                    color: "gray",
                                    border: "0px solid black"
                                    }}
                                >   
                                    The token issued at the time of your request has expired. Click
                                    <Link to="/recover-password" >here</Link> go back and try again.  
                                
                                
                            </Box>
                        </>
                    );
                    showMessageModal(currContent, "orange");
                    }

                } catch(error) {                               // ALL OTHER ERRORS
                    console.log(error)
                    if (error.response) {
                        console.error('Error status:', error.response.status);
                
                        if (error.response.status >= 400) {  // 401, 404, 403, 409, etc
                            setMessage(error.response.data.detail);
                            setFadeOut2(true); 
                            setTimeout(() => {
                                setMessage('')
                                setFadeOut2(false)
                            }, 3900);        
                        }
                    } 
                }
                
            } // end,  if (sendRequest) No need for an else. It will have been handled by this point
        }
        else {  // no token

            let currContent = (
                <>
                    <div style={{width:"100%", padding:0, color: "orange"}}>
                        <div style={{
                            width: "100%", backgroundColor: "rgba(0,0,0,0.0)", textAlign: 'center',
                            borderLeft: `0px solid orange`, paddingLeft: 5, paddingBottom: 0}}>
                        <h2>Can't find the reset token...</h2>
                        </div>                    
                    </div>
                    <Box style={{
                    width:"100%", 
                    padding:0, 
                    color: "gray",
                    border: "0px solid black"}}>         
                        No token was recieved to reset passwords.<br /><br />   It is possible you found this page in error.       
                        If you would like to reset your password, follow this <Link to="/recover-password">link</Link>.
                    </Box>
                </>
                );

                showMessageModal(currContent, "orange");      
                sendRequest = false;      
        }
    };


    return (
        <Box id="component-container"
             style={styles.component_container}
        > 
                <Modal
                    show={isModalVisible}
                    content={modalConfig.content}
                    buttons={modalConfig.buttons}
                    borderColor={modalConfig.borderColor}
                />     
          <Logo marginTop={40} marginBottom={30} />
          <Box id="main-container"
              style={styles.main_container}
          >
                <Box id="inner-main-container"
                    style={styles.inner_main_container}
                >
                    <div id="top-strip"
                        style={styles.top_strip}
                    ></div>

                      <Box id="inner-grouping-container" 
                          style={{...styles.inner_grouping_container}}
                      >
                            <div id="heading"
                                style={styles.heading}>
                                <div>
                                    <h2>Password Reset</h2>
                                </div>                      
                            </div>

                            <Box id="text-container"
                                style={styles.text_container}>
                                <div id="text-controller"
                                    style={styles.text_controller}
                                >
                                Enter the new password. Retype it to confirm.       
                                </div>
                            </Box>             
                            
                            <Box id="input-group" 
                                style={{...styles.input_group}}
                            >
                                <TextBox id="new-password" label="New Pasword *" type="password" width="100%" containerPadding={0} onChange={handleNewPassword} />
                                <Space howmuch={8} />
                                <TextBox id="confirm-password" label="Confirm Password *" type="password" width="100%" containerPadding={0}onChange={handleConfirmPassword} />
                            </Box> 

                            <div className={fadeOut2 ? 'fade-out' : ''}>
                                <Box style={{border: "0px solid black", height: 15}}>
                                    {message && (
                                    <Box style={{position: "relative", top: -2, border: "0px solid black", fontSize: 14, padding: 0, color: "orange", textAlign: "center"}}>
                                        {message}
                                    </Box>
                                    )}
                                </Box >   
                            </div>

                            <Box id="button-container"
                                style={{border: 0, marginTop: 5}}
                            >
                                
                                <Button
                                    onClick={sendResetPasswordRequest}
                                    style={styles.button}
                                > Reset Password
                                </Button>

                                <Links justifyContent="space-between" linkData={linkData}/>
                            </Box>
                      </Box>    
              </Box>          
        </Box>

        <Footer marginTop={80} />
    </Box>
    );
};


const linkData = {
    textOne: "Changed my mind.",
    pathOne: "/login",
    textTwo: "Contact Support",
    pathTwo: "/support"
  };

const styles = {
    top_strip: {       
        width: "100%",
        textAlign: "center",
        border: "1px solid gray",
        height: 18,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#817Daa',
        color: "black"
    },
    component_container: {
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: "auto",
        maxWidth: 650,
        paddingLeft: 10,
        paddingRight: 10,
        minWidth:290,
        border: "0px solid gray",
        width: "100%",
        color: "gray",                      
    },
    main_container: {
        backgroundColor: "rgb(12,12,12)",
        marginTop: 40,
        border: "1px solid black",
        padding: 0,      
    },
    inner_main_container: { // Why? Because I like the look of the black and gray borders together... bow I need to repeat it with all
        textAlign: "center",
        color: "white",
        border: "0px solid black",
        backgroundColor: "transparent",
        padding: 0
    },
    inner_grouping_container: {
        border: "1px solid rgb(33,33,33)",
    },
    heading: {
        display: "flex", 
        justifyContent: 'center', 
        border: "0px solid white"
    },
    text_container: {
        padding:10, 
        display:"flex", 
        justifyContent: "center",
        alignItems: "center", 
        border: "0px solid gray"
    },
    input_group: {
        border: "1px solid black",
    },
    text_controller: {
        width: "90%",
        textAlign: "center",
    },
    button: {
        width: "100%",
        fontWeight: "regular",
        fontSize: 18,               
    },
};

export default PasswordReset;
