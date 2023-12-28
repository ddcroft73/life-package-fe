import Box from "./elements/Box.js";

import { useLocation, Link } from 'react-router-dom';
import Button from "./elements/Button.js";
import TextBox from "./elements/TextBox.js";
import Space from "./Space.js";
import Logo from "./Logo.js";
import Footer from "./elements/Footer.js";
import { useState, useEffect } from 'react';
import { getEmail } from "../api/utils.js";
import { BASE_URL } from "../api/settings.js";


import Links from "./Links.js";
import Modal from "./Modal.js";
import axios from "axios";
      
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
        border: "1px solid rgb(33,33,33)",
        padding: 0,      
    },
    inner_main_container: { // Why? Because I like the look of the black and gray borders together... bow I need to repeat it with all
        textAlign: "center",
        color: "white",
        border: "1px solid black",
        backgroundColor: "transparent",
        padding: 0
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
    text_controller: {
        width: "90%",
        textAlign: "center",
    },
    button: {
        width: "100%",
        fontWeight: "bold",
        fontSize: 18,               
    },
};






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
    let sendRequest = true; 
    
    
// MODAL FUNCTIONS
    //const successAction = () =>  navigate('/verify-email', { state: { email: email } }); 
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

// HANDLERS
    const handleNewPassword = (value) => {
        setNewPassword(value);
    };
    const handleConfirmPassword = (value) => {
        setConfirmPassword(value);
    };
   
   
// Send the API call and handle the response
    const sendResetPasswordRequest = async () => {

        if (sendRequest) {
            const endPoint = `${BASE_URL}/auth/reset-password`;
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            
            const payload = {
                password: newPassword
            };

            console.log(payload)

            try {
               // /*
                let response = {
                    data: {
                        msg: `User: ${getEmail(token)} successfully updated their password.`
                    }
                };
                response.status = 200;
               // */

             //   const response = await axios.post(endPoint, payload, {headers: headers});
                const { msg } = response.data;
                
                console.log(response.status);
                if (response.status === 200) {
                    
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
                            {msg}&nbsp; Go to the <Link to="/login" >login</Link> page to get back into your account.                                                    
                      </Box>
                    </>
                  );
                  showMessageModal(successContent, "blue");
                }

                if (response.status === 403) {
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
                            <Link to="/recover-password" >here</Link> to have another sent to:  
                            <span style={{color:"orange"}}> {getEmail(token)}</span>
                        
                      </Box>
                    </>
                  );
                  showMessageModal(currContent, "orange");
                }

            } catch(error) {       
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
            
        } 
};


    useEffect(() => {
        document.title = "Reset Password: Life Package 2023";
    }, []); 



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
          <Logo marginTop={40} marginBottom={60} />
          <Box id="main-container"
              style={styles.main_container}
          >
                <Box id="inner-main-container"
                    style={styles.inner_main_container}
                >
                    <div id="top-strip"
                        style={styles.top_strip}
                    ></div>
    
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
                    
                    <Box style={{border:0}}>
                        <TextBox id="new-password" label="New Pasword *" type="password" width="100%" containerPadding={0} onChange={handleNewPassword} />
                        <Space howmuch={8} />
                        <TextBox id="confirm-password" label="Confirm Password *" type="password" width="100%" containerPadding={0}onChange={handleConfirmPassword} />
                    </Box> 

                    <Space howmuch={25} />

                    <Box id="button-container"
                      style={{border: 0}}
                    >
                        <Button
                            onClick={sendResetPasswordRequest}
                            style={styles.button}
                        > Submit
                        </Button>

                    <Links justifyContent="space-between" linkData={linkData}/>
                    </Box>    
            </Box>          
      </Box>
        <Footer marginTop={80} />
    </Box>
    );
};
export default PasswordReset;
