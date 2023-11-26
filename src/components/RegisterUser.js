import React from 'react';
import './RegisterUser.css';

import { userRegister } from '../api/api.js';
import { isEmailAddress } from '../api/utils.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from "../components/elements/Box.js";
import Paper from "../components/elements/Paper.js";
import TextBox from "../components/elements/TextBox.js";
import Button from "../components/elements/Button.js";
import Space from "../components/Space.js";
import Modal from './Modal';


const RegisterUser = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');

    const [message, setMessage] = useState('');
    const [modalConfig, setModalConfig] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigate = useNavigate();

    const handleEmail = (value) => setEmail(value);
    const handleFullName = (value) => setFullName(value);
    const handlePasswordOne = (value) => setPasswordOne(value);
    const handlePasswordTwo = (value) => setPasswordTwo(value);
    
    // Predefined actions
    const confirmAction = () =>  navigate('/verify-email', { state: { email: email } }); 
    const cancelAction = () => setIsModalVisible(false);
    
    // Function to show modal with OK button, just for message
    const showMessageModal = (content) => {
        setModalConfig({
        content,
        buttons: [
            { text: 'OK', handler: cancelAction }
        ]
        });
        setIsModalVisible(true);
    };

    // Function to program modal for an action on OK
    const showConfirmModal = (content) => {
        setModalConfig({
        content,
        buttons: [
            { text: 'OK', handler: confirmAction },
            //{ text: 'Cancel', handler: cancelAction }
        ]
        });
        setIsModalVisible(true);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        let userData = {};
        let sendRequest = true;
        
        if (fullName) {
            userData.fullName = fullName;
        }
        if (!isEmailAddress(email)) {
            setMessage(`${email} is not a valid email address.`)
            setTimeout(() => setMessage(""), 3000);
            sendRequest = false;
        }        
        if (passwordOne !== passwordTwo) {
            setMessage("Passwords do not match.");
            setTimeout(() => setMessage(""), 3000);
            sendRequest = false;
        }

        userData.email = email;
        userData.password = passwordOne;

        if (sendRequest) {
            const response = await userRegister(userData);
            const { error } = response
            
            
            // If an error was caught it was packaged and sent back in response.error
            // If not, then there will be an email for the user. response.user.email
            if (!error) {
                // show modal success
                const email = response.user.email;
                  // show modal
                   //alert("User exists")
                   let currContent = (
                    <>
                      <div style={{width:"100%", padding:0, color: "white"}}><h2>Success:</h2></div>
                      <Box style={{
                        width:"100%", 
                        padding:0, 
                        color: "gray",
                        border: "0px solid black"}}>  
                            An Account was created for:<span style={{color:"orange"}}>{email}</span>.  
                            
                      </Box>
                    </>
                  );
                   showConfirmModal(currContent);                 
                   
            }
            else {
               if (error === "user exists") {
                   // show modal
                   //alert("User exists")
                   let currContent = (
                    <>
                      <div style={{width:"100%", padding:0, color: "red"}}><h2>Error:</h2></div>
                      <Box style={{
                        width:"100%", 
                        padding:0, 
                        color: "gray",
                        border: "0px solid black"}}>       
                            The user: <span style={{color:"orange"}}>{email}</span> already exists.
                        
                      </Box>
                    </>
                  );
                  showMessageModal(currContent);

               } else if (error === 'server closed') {
                   // show modal
                   let currContent = (
                    <>
                      <div style={{width:"100%", padding:0, color: "Error"}}><h2>Error:</h2></div>
                      <Box style={{
                        width:"100%", 
                        padding:0, 
                        color: "gray",
                        border: "0px solid black"}}>                                
                        The system is not taking new users at this time. For more information, 
                        contact <span style={{color:"orange"}}>Support</span>.
                      </Box>
                    </>
                  );
                  showMessageModal(currContent);
               } else {
                    // show modal
                   // Unknown error
                   let currContent = (
                    <>
                      <div style={{width:"100%", padding:0, color: "Error"}}><h2>Error:</h2></div>
                      <Box style={{
                        width:"100%", 
                        padding:0, 
                        color: "gray",
                        border: "0px solid black"}}>                            
                          <span style={{color:"white"}}>{error}</span>.
                      </Box>
                    </>
                  );
                  showMessageModal(currContent);
               }
            }
            console.log("response:", `${JSON.stringify(response)}`);
        }               
    };

    return (
        <Box className="box" style={{ border: "0px solid black", paddingTop: "20px" }}>

            <Modal
                show={isModalVisible}
                content={modalConfig.content}
                buttons={modalConfig.buttons}
                // can also pass onCancel here if needed
            />

            <Paper elevation={8} className="container">
            <Box style={{ border:"1px soid white",height:'auto', width:'100%', padding: 0, display: 'flex', justifyContent: 'center',}}>
                  <Box style={{
                    textAlign: "center",
                    backgroundColor:'#484444',
                    border:"1px solid #817Daa", 
                    height:60, 
                    color: "#817Daa",
                    width:"95%", 
                    fontSize: 25,
                    marginTop: 25,
                    marginBottom: 0,
                    lineHeight: 1.5
                   }}>
                      Life Package&#8482;  Registration                   
                    
                  </Box>
              </Box>
                <form className="registration-form" onSubmit={handleSubmit}>
                  
                        <TextBox 
                            id="email" 
                            label="Email*" 
                            value={email} 
                            type="text" 
                            required
                            width="100%" containerPadding={0} onChange={handleEmail} //onChange={(e) => setEmail(e.target.value)
                        />
                       <Space howmuch={5} />
                       <TextBox 
                            id="fullName" 
                            label="Full Name" 
                            value={fullName} 
                            type="text" 
                            width="100%" containerPadding={0} onChange={handleFullName}
                        />
                        <Space howmuch={5} />
                        
                        <TextBox 
                            id="password" 
                            label="Password*" 
                            value={passwordOne} 
                            type="password" 
                            required
                            width="100%" containerPadding={0} onChange={handlePasswordOne}
                        />

                      <Space howmuch={5} />
                       <TextBox 
                            id="repeat-password" 
                            label="Repeat-Password*" 
                            value={passwordTwo} 
                            type="password" 
                            required
                            width="100%" containerPadding={0} onChange={handlePasswordTwo}
                        />
                    

                    <Box style={{border: "0px solid black",height: 35}}>
                      {message && (
                       <Box style={{border: "0px solid black", lineHeight: 2, fontSize: 14, padding: 0, color: "orange", textAlign: "center"}} className="error-message">
                        {message}
                       </Box>
                        )}
                    </Box >    

                    <Button style={{border: "1px solid white", fontSize: 23}} type="submit">Sign up</Button>
                    <Box style={{
                        border: "0px solid black", 
                        fontSize: 13, 
                        color: "#bd841b", 
                        padding: 0, 
                        paddingTop:4,
                        display: 'flex',
                        justifyContent: 'space-between',

                        paddingBottom: 5,
                    }}>

                        <Box style={{border: "0px solid black", padding:0, marginLeft:10, marginTop: 3}}>
                            <Link to="/two-factor-auth"> Contact Support</Link>
                        </Box> 
                        <Box style={{border: "0px solid black", padding:0, marginRight:10, marginTop: 3}}>
                            <Link  to="/login">Already a member?  Log in</Link>
                        </Box> 

                   </Box> 
                   
                   <Space howmuch={15}/>

                    <Box style={{border: "0px solid black", height:23, display: 'flex', lineHeight: 0, fontSize: 14, width: "100%"}}>
                        <div className="hr"></div> 
                        &nbsp;&nbsp;&nbsp;Or&nbsp;&nbsp;&nbsp;
                        <div className="hr"></div>
                   </Box>    
                   <Box style={{border: "0px solid   black", display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: "column", marginTop: 0, marginBottom: 8}}>
                        <Box style={{display: 'flex', border: "0px solid black", padding: 0}}>
                            <div className="oauth"><i className="fa-brands fa-facebook-f" /></div>
                            <div className="oauth"><i className="fa-brands fa-google" /></div>              
                        </Box>
                   </Box>

                </form>
            </Paper>
            <Box className="copy-box" style={{fontSize: 12, width: "auto", marginTop: 10, border:"0px solid black", textAlign: 'center', color: "gray"}}>
                 Copyright &#169; 2023 Life Package &#8482;   &nbsp;&nbsp;&nbsp;<a href='4'>Privacy Policty</a>&nbsp;&nbsp;&nbsp; <a href='5'>TOS</a>
            </Box>
        </Box>
        
    );
};

export default RegisterUser;
