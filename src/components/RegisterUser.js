import React from 'react';
import './RegisterUser.css';
import { userRegister } from '../api/api.js';
import { isEmailAddress } from '../api/utils.js';
import Box from "../components/elements/Box.js";
import Paper from "../components/elements/Paper.js";
import TextBox from "../components/elements/TextBox.js";
import Button from "../components/elements/Button.js";
import Space from "../components/Space.js";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const RegisterUser = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const navigate = useNavigate();

    const handleEmail = (value) => {
        setEmail(value);
    };
    const handleFullName = (value) => {
        setFullName(value);
    };
    const handlePasswordOne = (value) => {
        setPasswordOne(value);
    };
    const handlePasswordTwo = (value) => {
        setPasswordTwo(value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        let userData = {};
        let sendRequest = true;
        
        if (fullName) {
            userData.fullName = fullName;
        }
        if (!isEmailAddress(email)) {
            console.log(`${email} is not a valid email address. Try again mfr...`);
            sendRequest = false;
        }        
        if (passwordOne !== passwordTwo) {
            console.log("Passwords do not match.");
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

                alert(`Account created for ${email}`);                
                navigate('/verify-email', { state: { email: email } });
            }
            else {
               if (error === "user exists") {
                   // show modal
                   alert("User exists")
               } else if (error === 'server closed') {
                   // show modal
                   alert("Server Closed")
               } else {
                   alert(`Unkown: ${error}`)
               }
            }
            console.log("response:", `${JSON.stringify(response)}`);
        }               
    };

    return (
        <Box className="box" style={{ border: "0px solid black", paddingTop: "20px" }}>
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

                    <Space howmuch={35} />
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
                    <Space howmuch={25} />
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
