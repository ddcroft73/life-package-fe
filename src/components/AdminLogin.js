
import Box from "./elements/Box.js";
import Button from "./elements/Button.js";
import TextBox from "./elements/TextBox.js";
import Space from "./Space.js";
import { Link} from "react-router-dom";

import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa'; // This is for the login icon
import './AdminLogin.css'; // Make sure to create a corresponding CSS file

const AdminLogin = () => {
  const [pin, setPin] = useState('');  
  const [message, setMessage] = useState('');  


  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the PIN submission here
    console.log('PIN submitted:', pin);
    setMessage("YO Message mfr!!")
  };

  const handlePIN = (value) => {

  };

  return (
    <Box style={{marginTop: 35, width: 350, border: "none"}}>
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
                <TextBox  id="pin" label="PIN*" type="password" width="100%" containerPadding={0} onChange={handlePIN}/>
            </div>

            <Space howmuch={40-15} />
            <Box style={{border: "0px solid black",height: 15}}>
                    {message && (
                    <Box style={{position: 'relative', top: -20, border: "0px solid black", fontSize: 14, padding: 0, color: "orange", textAlign: "center"}} className="error-message">
                        {message}
                    </Box>
                    )}
                </Box >     
            <div style={{ display: 'flex', flexDirection: "column"  }}>
                <Button type="submit" className="login-button" style={{marginTop: '1px', width: '100%', fontSize:"20px", backgroundColor: "#817Dda", 
                border:"1px solid gray", lineHeight: 0, height: 35}}
                    onClick={handleSubmit}>Submit
                </Button> 

                <Box style={{fontSize: 12, border: "0px solid black", padding:0, marginRight:10, marginTop: 6}}>
                     <Link  to="/register">Contact life Package Support</Link>
                </Box> 

            </div>
        </form>
        </Box>
    </Box>
  );
};

export default AdminLogin;
