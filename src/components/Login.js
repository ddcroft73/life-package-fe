import React from 'react';
import { useNavigation, useLocation } from "react-router-dom";
import { userLogin } from '../api/api.js';
import { useState } from 'react';
import Admin from "./AdminLogin.js";
import Box from "../components/elements/Box.js";
import Button from "../components/elements/Button.js";
import TextBox from '../components/elements/TextBox.js';
import Paper from '../components/elements/Paper.js';
import ToggleSwitch from '../components/elements/ToggleSwitch.js';

import './Login.css';

const isEmailAddress = (emailString) => {
    if (emailString.includes('@') && emailString.includes('.')) {
      return true;
    }
    return false;
};


// for debugging 
//localStorage.setItem('login_attempts', 0);
const  Login = () => {;
  //const [email, setEmail] = useState('');
  //const navigation = useNavigation();
  const defaultRememberMeData = JSON.parse(localStorage.getItem('rememberMe')) || {};
  const [email, setEmail] = useState(defaultRememberMeData.username || '');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(defaultRememberMeData.value || false);
  
  
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    try {
      // validate email and password:
      const hasAccess = await userLogin(email, password);
      if (hasAccess === "admin") {
          //navigate to admin Login
      } else if (hasAccess === "user"){
          // navigate to user dash
      }
      console.log(`hasAccess: ${hasAccess}`)

    } catch (error) {
      console.error(error.message)
    }
  };
  const handleUsername = (value) => {
       setEmail(value)
  };
  const handlePassword = (value) => {
       setPassword(value)
  };
  const handleRememberMe = (value) => {
     setChecked(value)

     const rememberMe = {
         "username": email,
         "value": value
     };

     if (value === true && email != "" && isEmailAddress(email)){
         localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
     }else {
      console.log("Not a valid email address as usrname.")
     }    
     
    // if they selected Don't 
    if (value === false) {
      rememberMe.username = '';
      localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
    }
  };

  return (

   <Box  style={{ border: "0px solid black",display: 'flex', justifyContent: 'center', alignItems: 'center',padding: 20}}>
       <Paper elevation={10}   variant="outlined"
            style={{
              width: '375px', 
              height: '515px', 
              backgroundColor: 'var(--body-background-dark-0)',
              border: "1px solid #007bff",
            }}>

            <Box className="copyRight-box" style={{border: "0px soid black", textAlign: 'left', fontSize: 12, color: 'gray'}} >              
              <Box style={{ border:'none',height:'auto', width:'100%', padding: 0, display: 'flex', justifyContent: 'center',}}>
                  <Box style={{
                    textAlign: "center",
                    backgroundColor:'#444444',
                    border:"0px solid #817caa", height:55, width:"100%", fontSize: 25}}><i className="fas fa-sign-in-alt" /> &nbsp;Life Package</Box>
              </Box>
              
              <TextBox  id="email" label="Email" value={email} type="text" width="100%" containerPadding={0}
                onChange={handleUsername} />

              <TextBox  id="password" label="Password" type="password" width="100%" containerPadding={0} 
               onChange={handlePassword}/>
              
              <Box style={{
                    border:"0px solid black", 
                    fontSize: '16px',
                    lineHeight: 1, 
                    marginTop: 15,paddingLeft: 0, color: 'gray'}}>
                  <div>
                  <ToggleSwitch value={isChecked} onChange={handleRememberMe}/>&nbsp;&nbsp;Remember me
                  </div>
              </Box>

              <Button style={{marginTop: 10,width: '100%', fontSize:"18px"}}
                  onClick={handleSubmit}> Sign In</Button>
              
              <Box style={{
                  border: "0px solid black", 
                  fontSize: 13, 
                  color: "#bd841b", 
                  paddingTop: 8, 
                  paddingRight:0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: 0,
                  }}>
                  <Box style={{border: "0px solid black", paddingTop: 0, paddingLeft:0}}>
                  <a href='8'> Forgot Password?</a>
                  </Box> 
                  <Box style={{border: "0px solid black", paddingTop: 0, paddingLeft:0}}>
                   <a href='1'>Register a New Account.</a> 
                  </Box> 
              </Box> 
              <p/><p/>
              <Box style={{border: "0px solid   black", display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: "column", marginBottom: 8}}>
                  <Box style={{display: 'flex', border: "0px solid black", padding: 0}}>
                    <div className="oauth"><i className="fa-brands fa-facebook-f" /></div>
                    <div className="oauth"><i className="fa-brands fa-twitter" /></div>
                    <div className="oauth"><i className="fa-brands fa-github" /></div>     
                    <div className="oauth"><i className="fa-brands fa-google" /></div>              
                  </Box>
                    <Box style={{border: "0px solid #817caa", color: '#817caa',padding:0, paddingBottom: 45, fontSize: 12}}></Box>                   
              </Box>
              Copyright &#169; 2023 Life Package &#8482;   &nbsp;&nbsp;&nbsp;<a href='4'>Privacy Policty</a>&nbsp;&nbsp;&nbsp; <a href='5'>TOS</a>
          </Box>    
       </Paper>
   </Box>
   
  );
}

export default Login;
