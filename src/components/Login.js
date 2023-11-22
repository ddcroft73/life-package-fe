import React from 'react';
import { useNavigation, useLocation, useNavigate } from "react-router-dom";
import { userLogin } from '../api/api.js';
import { useState } from 'react';
import Admin from "./AdminLogin.js";
import Box from "../components/elements/Box.js";
import Button from "../components/elements/Button.js";
import TextBox from '../components/elements/TextBox.js';
import Paper from '../components/elements/Paper.js';
import ToggleSwitch from '../components/elements/ToggleSwitch.js';
import { Link } from 'react-router-dom';

import { isEmailAddress } from '../api/utils.js';
import './Login.css';


// I am such a terrible front end programmer.... THis is the only way I could get a discernable 
// amount of space between the 2 texboxes. 
function Space({ howMuch }) {
  return (
    <div style={{ height: howMuch }}>
    </div>
  );
};

const  Login = () => {
  
  const defaultRememberMeData = JSON.parse(localStorage.getItem('rememberMe')) || {};
  const [email, setEmail] = useState(defaultRememberMeData.username || '');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(defaultRememberMeData.value || false);
  const [error, setError] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();     
    
       // Validate the email and password first.
    try {
      const accessType = await userLogin(email, password);
      
      // All good
      if (accessType.action === "use2FA") {
          navigate('/two-factor-auth');        

      } else if (accessType === "admin") {
          navigate('/admin-login');

      } else if (accessType === "user"){
          navigate('/user-dashboard');
      } 
      
      // Bad Response
      else if (accessType === "inactive user"){
         console.log(accessType);
      }
      else if (accessType === "locked out"){
        console.log(accessType);
     } 
     else if (accessType === "wrong credintials") {
        setError('Incorrect username or password.');
        setTimeout(() => setError(''), 2000);
     }

    } catch (error) {
      console.error(error.message);
    }
  };
  


  const handleUsername = (value) => {
       setEmail(value);
  };
  const handlePassword = (value) => {
       setPassword(value);
       setError('');
  };
  const handleRememberMe = (value) => {
     setChecked(value);

     const rememberMe = {
         "username": email,
         "value": value
     };

     if (value === true && email != "" && isEmailAddress(email)){
         localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
     }else {
      console.log("Not a valid email address as usrname.");
     }    
     
    // if they selected Don't 
    if (value === false) {
      rememberMe.username = '';
      localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
    }
  };

  return (

   <Box  style={{ border: "0px solid #817Daa", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20}}>
       <Paper elevation={6}   variant="outlined"
            style={{
              width: '375px', 
              height: '555px', 
              backgroundColor: 'var(--body-background-dark-1)',
              border: "0px solid #817Daa",
            }}>

          <Box className="copyRight-box" style={{border: "1px soid #817Daa", textAlign: 'none', fontSize: 12, color: 'gray'}} >     

              <Box style={{ border:"1px soid white",height:'auto', width:'100%', padding: 0, display: 'flex', justifyContent: 'center',}}>
                  <Box style={{
                    textAlign: "center",
                    backgroundColor:'#484444',
                    border:"1px solid #817Daa", 
                    height:125, 
                    width:"100%", 
                    fontSize: 25,
                    marginBottom: 20}}>
                      <div style={{fontSize: 54, color: "#817Daa"}}>
                      <i className="fas fa-sign-in-alt" /></div> &nbsp;Life Package &#8482;                   
                    
                  </Box>
              </Box>

              <Box style={{border: "0px solid black", padding:0}}>
                <TextBox  id="email" label="Email*" value={email} type="text" width="100%" containerPadding={0} onChange={handleUsername} />
                <Space howMuch={8} />
                <TextBox  id="password" label="Password*" type="password" width="100%" containerPadding={0} onChange={handlePassword}/>
              </Box>

              <Box style={{border: "0px solid black",height: 15}}>
                {error && (
                  <Box style={{border: "0px solid black", fontSize: 14, padding: 0, color: "rgb(164, 56, 56)", textAlign: "center"}} className="error-message">
                    {error}
                  </Box>)}
              </Box>
             
              <Box className="toggle-box" style={{
                    border:"0px solid black", 
                    fontSize: '14px',
                    lineHeight: 1, 
                    marginTop: 20,
                    //paddingLeft: 0, 
                    padding:0,
                    paddingBottom:7,
                    color: 'gray'}}>
                  <div>
                  <ToggleSwitch value={isChecked} onChange={handleRememberMe}/>&nbsp;&nbsp;Remember me
                  </div>
              </Box>

              <Button style={{marginTop: '1px', width: '100%', fontSize:"18px", border:"1px solid white"}}
                  onClick={handleSubmit}> Sign In
              </Button>
              
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
                     <Link to="/recover-password"> Forgot Password?</Link>
                  </Box> 
                  <Box style={{border: "0px solid black", padding:0, marginRight:10, marginTop: 3}}>
                     <Link  to="/register">Register a New Account.</Link>
                  </Box> 

              </Box> 

              <p/><p/>
              <Box style={{border: "0px solid black", height:23, display: 'flex', lineHeight: 0, fontSize: 14, width: "100%"}}>
                <div className="hr"></div> 
                &nbsp;&nbsp;Or&nbsp;&nbsp;
                <div className="hr"></div>
              </Box>

              <Box style={{border: "0px solid   black", display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: "column", marginTop: 0, marginBottom: 8}}>
                  <Box style={{display: 'flex', border: "0px solid black", padding: 0}}>
                    <div className="oauth"><i className="fa-brands fa-facebook-f" /></div>
                    <div className="oauth"><i className="fa-brands fa-google" /></div>              
                  </Box>
                            
              </Box>

              <Space howMuch={25}/>

              <Box style={{width: "375px", border:"0px solid black"}}>

                 Copyright &#169; 2023 Life Package &#8482;   &nbsp;&nbsp;&nbsp;<a href='4'>Privacy Policty</a>&nbsp;&nbsp;&nbsp; <a href='5'>TOS</a>
              </Box>

          </Box>    
       </Paper>

   </Box>
   
  );
}

export default Login;
