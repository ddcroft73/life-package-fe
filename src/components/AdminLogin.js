import Box from "./elements/Box.js";
import Button from "./elements/Button.js";
import TextBox from "./elements/TextBox.js";
import Space from "./Space.js";
import { Link, useNavigate, } from "react-router-dom";
import Modal from "./Modal.js";
import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../api/settings.js";
import Logo from "./Logo.js";
import Footer from "./elements/Footer.js";
import './AdminLogin.css'; // Make sure to create a corresponding CSS file
import axios from "axios";


const AdminLogin = () => {
    const [pin, setPin] = useState('');  
    const [message, setMessage] = useState('');   
    const [fadeOut, setFadeOut] = useState(false);
    const [fadeOut2, setFadeOut2] = useState(false);

    const [modalConfig, setModalConfig] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigate = useNavigate();    
    
    useEffect(() => {
        document.title = "Administrator Login: LifePackage 2024";
    }, []);


    const confirmAction = () =>  setIsModalVisible(false); //navigate('/verify-email', { state: { email: email } });   
    const cancelAction = () => setIsModalVisible(false);
         
    
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


    const sendRequest = async () => {

        const isNumeric = str => /^\d+$/.test(str);

        if (isNumeric(pin)) {
            if (pin.length > 3) {

                const userData = JSON.parse(localStorage.getItem("LifePackage"));
                const token = userData ? userData.access_token : null;
                

                if (token) {
                    const userInputPIN =  pin;
                    const endPoint = `${BASE_URL}/auth/login/verify-admin-pin?pin_number=${userInputPIN}`;
                    const headers = {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    };
                    
                    try {
                        //let response = {};
                        //response.status = 200;
                        const response = await axios.post(endPoint, {}, {headers: headers});
                        const { token } = response.data;
                        let adminToken = {};
                        
                        if (response.status === 200) {
                          adminToken.token = token
                          localStorage.setItem("adminToken", JSON.stringify(adminToken));

                          // ...and load admin workstation
                          navigate("/admin-dashboard");
                        }

                    } catch(error) {       
                        
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
                    
                } else {
                    // No Access Token.... WTF?
                    let modalContent = (
                        <>
                        <div style={{width:"100%", padding:0, color: "orange"}}>
                          <div style={{
                            width: "100%", backgroundColor: "rgba(0,0,0,0.600)", borderRadius: 4, 
                            borderLeft: `0px solid orange`, paddingLeft: 5, paddingBottom: 0, textAlign: "center"}}>
                              <h2>Access Token Error</h2>
                          </div>                             
                        </div>
                        <Box style={{
                            width:"100%", 
                            padding:0, 
                            color: "white",
                            border: "0px solid black"}}>       
                                You seem to be missing the access token. You can 
                                fix this by going back to <Link style={{lineHeight: 1}} to='/login'>login</Link> again.
                        </Box>
                        </>
                    );
                    showMessageModal(modalContent, "orange"); 
                }
     // THis logic is screwey comeback and fix this code.
     //"The PIN cannot be empty." in 2 cases
            } else if (pin.length < 4){      
                setMessage("The PIN is at least four digits.");
                setFadeOut2(true); 
                setTimeout(() => {
                    setMessage('')
                    setFadeOut2(false)
                }, 3900);


            } else if (pin.length === 0){
                setMessage("The PIN cannot be empty.");
                setFadeOut2(true); 
                setTimeout(() => {
                    setMessage('')
                    setFadeOut2(false)
                }, 3900);
            }    

        } else {
            if (pin.length === 0) {
                setMessage("The PIN cannot be empty.");
                setFadeOut2(true); 
                setTimeout(() => {
                    setMessage('')
                    setFadeOut2(false)
                }, 3900);
            } else {
            setMessage("The PIN must be all numbers.");
                setFadeOut2(true); 
                setTimeout(() => {
                    setMessage('')
                    setFadeOut2(false)
                }, 3900);
            }
        }
    };
    
    const handleCancel = () => {
         // I mean what can you do? go back to Login
        setFadeOut(true);
        setTimeout(() =>  navigate('/login'), 3000);  
    };

    const handlePIN = (value) => {
        setPin(value);
    };

    return (
       <div className={fadeOut ? 'fade-out' : ''}>
        
       <Logo marginTop={50} />
          <Box style={{marginTop: 35, width: 350, border: "none", paddingLeft: 30, paddingRight: 30}}>

             <Modal
                show={isModalVisible}
                content={modalConfig.content}
                buttons={modalConfig.buttons}
                borderColor={modalConfig.borderColor}
             />


              <Space howmuch={20} />
              <Box className="admin-login-container" style={{ background: 'rgb(12, 12, 12)',  border:"1px solid rgb(33,33,33)", }}> {/* Set the background color */}
                          
                  <div style={{border: "0px solid black",  backgroundColor: ""}}>
                      <TextBox  id="pin" label="Administration PIN *" type="password"  width="100%" containerPadding={0} onChange={handlePIN}/>
                  </div>

                  <Space howmuch={40-15} />

                  <div className={fadeOut2 ? 'fade-out' : ''}>
                      <Box style={{border: "0px solid black",height: 15}}>
                          {message && (
                          <Box style={{position: 'relative', top: -20, border: "0px solid black", fontSize: 14, padding: 0, color: "orange", textAlign: "center"}} className="error-message">
                              {message}
                          </Box>
                          )}
                      </Box >   
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                      <Button  className="login-button" style={{marginTop: '1px', width: '100%', fontSize:"20px", backgroundColor: "#817Dda", 
                      border:"1px solid gray", lineHeight: 0, height: 35}}
                          onClick={sendRequest}>Ok
                      </Button> 
                      <Button  className="login-button" style={{marginTop: '1px', width: '100%', fontSize:"20px", backgroundColor: "#817Dda", 
                      border:"1px solid gray", lineHeight: 0, height: 35}}
                          onClick={handleCancel}>Cancel
                      </Button>                      

                  </div>

                  
              
              </Box>
          </Box>
          
          <Footer marginTop={20} />
       </div>   
  );
};

export default AdminLogin;
