import Box from "./elements/Box.js";
import Button from "./elements/Button.js";
import TextBox from "./elements/TextBox.js";
import Space from "./Space.js";
import { Link, useNavigate} from "react-router-dom";
import Modal from "./Modal.js";
import React, { useState } from 'react';
import { BASE_URL } from "../api/settings.js";
import './AdminLogin.css'; // Make sure to create a corresponding CSS file
import axios from "axios";


const AdminLogin = () => {
    const [pin, setPin] = useState('');  
    const [message, setMessage] = useState('');   
    const [fadeOut, setFadeOut] = useState(false);
    const [modalConfig, setModalConfig] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();    

    const confirmAction = () =>  setIsModalVisible(false); //navigate('/verify-email', { state: { email: email } });     
    const showMessageModal = (content) => {
        setModalConfig({
        content,
        buttons: [
            { text: 'OK', handler: confirmAction }
        ]
        });
        setIsModalVisible(true);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const isNumeric = (str) => {
            return /^\d+$/.test(str);
        };

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
                        let response = {};
                        response.status = 200;
                        //const response = await axios.post(endPoint, headers);
                        
                        if (response.status === 200) {
                           // all good store the admin token.

                        }

                    } catch(error) {       
                        
                        if (error.response) {
                            console.error('Error status:', error.response.status);
                    
                            if (error.response.status >= 400) {  // 401, 404, 403, 409, etc
                                setMessage(error.response.data.detail);
                                setTimeout(() => setMessage(""), 3000);               
                            }
                        } 
                    }
                    
                } else {
                    // No Access Token.... WTF?
                    let modalContent = (
                        <>
                        <div style={{width:"100%", padding:0, color: "orange"}}>
                            <h2>Access Token Error:</h2>
                        </div>
                        <Box style={{
                            width:"100%", 
                            padding:0, 
                            color: "white",
                            border: "0px solid black"}}>       
                                You seem to be missing the access token. You can 
                                fix this by going <Link style={{lineHeight: 1}} to='/login'>back</Link> and logging in again.
                        </Box>
                        </>
                    );
                    showMessageModal(modalContent); 
                }

            } else if (pin.length != 0){                
                setMessage("The PIN is at least four digits.")
                setTimeout(() =>  setMessage(''), 3000); 

            } else if (pin.length === 0){
                setMessage("The PIN cannot be empty. .")
                setTimeout(() =>  setMessage(''), 3000); 
            }    

        } else {
            setMessage("The PIN must be all numbers.")
            setTimeout(() =>  setMessage(''), 3000);  
        }
    };
    
    const handleCancel = (event) => {
         // I mean what can you do? go back to Login
        setFadeOut(true);
        setTimeout(() =>  navigate('/login'), 3000);   
    };

    const handlePIN = (value) => {
        setPin(value);
    };

    return (
       <div className={fadeOut ? 'fade-out' : ''}>
          <Box style={{marginTop: 35, width: 350, border: "none"}}>

             <Modal
                show={isModalVisible}
                content={modalConfig.content}
                buttons={modalConfig.buttons}
             />

              <Box style={{
                          
                          textAlign: "center",
                          backgroundColor: "var(--body-background-dark)",//'#484444',
                          border:"0px solid gray", 
                          height:125, 
                          width:"100%", 
                          color: "gray",
                          fontSize: 25,
                          marginBottom: 0}}>
                            <div style={{fontSize: 54, color: "#817Dda"}}>
                            <i className="fas fa-sign-in-alt" /></div> &nbsp;Life Package &#8482;                   
                          
                        </Box>
              <Space howmuch={20} />
              <Box className="admin-login-container" style={{ background: 'rgb(22, 22, 22)',  border:"1px solid #817Daa", }}> {/* Set the background color */}
            
            

              <form onSubmit={handleSubmit}>
                
                  <div style={{border: "0px solid black",  backgroundColor: ""}}>
                      <TextBox  id="pin" label="PIN*" type="password"  width="100%" containerPadding={0} onChange={handlePIN}/>
                  </div>

                  <Space howmuch={40-15} />
                  <Box style={{border: "0px solid black",height: 15}}>
                          {message && (
                          <Box style={{position: 'relative', top: -20, border: "0px solid black", fontSize: 14, padding: 0, color: "orange", textAlign: "center"}} className="error-message">
                              {message}
                          </Box>
                          )}
                      </Box >     
                  <div style={{ display: 'flex', gap: 10 }}>
                      <Button type="submit" className="login-button" style={{marginTop: '1px', width: '100%', fontSize:"20px", backgroundColor: "#817Dda", 
                      border:"1px solid gray", lineHeight: 0, height: 35}}
                          onClick={handleSubmit}>Ok
                      </Button> 
                      <Button type="submit" className="login-button" style={{marginTop: '1px', width: '100%', fontSize:"20px", backgroundColor: "#817Dda", 
                      border:"1px solid gray", lineHeight: 0, height: 35}}
                          onClick={handleCancel}>Cancel
                      </Button>                      

                  </div>

                  <Box style={{fontSize: 12, border: "0px solid black", padding:0, marginRight:10, marginTop: 6}}>
                          <Link  to="/register">Contact life Package Support</Link>
                      </Box> 
              </form>
              </Box>
          </Box>
       </div>   
  );
};

export default AdminLogin;
