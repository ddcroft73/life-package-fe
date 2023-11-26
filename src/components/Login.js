import React from 'react';
import { useNavigation, useLocation, useNavigate, Link} from "react-router-dom";
import { userLogin } from '../api/api.js';
import { useState } from 'react';
import Admin from "./AdminLogin.js";
import Box from "../components/elements/Box.js";
import Button from "../components/elements/Button.js";
import TextBox from '../components/elements/TextBox.js';
import Paper from '../components/elements/Paper.js';
import ToggleSwitch from '../components/elements/ToggleSwitch.js';
import Space from '../components/Space.js';

import { isEmailAddress } from '../api/utils.js';
import './Login.css';



const  Login = () => {
  
  const defaultRememberMeData = JSON.parse(localStorage.getItem('rememberMe')) || {};
  const [isChecked, setChecked] = useState(defaultRememberMeData.value || false);
  const [email, setEmail] = useState(defaultRememberMeData.username || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [fadeOut, setFadeOut] = useState(false);

  let sendRequest = false;

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();     
    
    if (email && password) {sendRequest = true;}

    if (sendRequest) {
      try {
        const response = await userLogin(email, password);
        const {action} = response;
        
        
        console.log(`response: ${response}`)
        // All good        
        if (action) {
            setFadeOut(true);
            setTimeout(() =>  navigate('/two-factor-auth', { state: { email: email } }), 3000);          
        } 
        
        if (response === "admin") {
            setFadeOut(true);
            setTimeout(() =>  navigate('/admin-login'), 3000);     
           
        } 
        else if (response === "user"){
          setFadeOut(true);
          setTimeout(() =>  navigate('/user-dashboard'), 3000);  
        } 
        
        // Bad Response
        else if (response === "inactive user"){
          console.log(response);
        }
        else if (response === "locked out"){
          console.log(response);
        } 
        else if (response === "non-verified"){
            console.log(response);
        }                      
        else if (response === "wrong credentials") {
          setError('Incorrect username or password.');
          setTimeout(() => setError(''), 5000);
        }

      } catch (error) {        
        console.error(error.message);
      }

    } else {
      alert("Missing email or password.")
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
     }     
    // if they selected Don't 
    if (value === false) {
      rememberMe.username = '';
      localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
    }
  };

  return (
  
  <div className={fadeOut ? 'fade-out' : ''}>
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
                <Space howmuch={8} />
                <TextBox  id="password" label="Password*" type="password" width="100%" containerPadding={0} onChange={handlePassword}/>
              </Box>

              <Box style={{border: "0px solid black",height: 15}}>
                {error && (
                  <Box style={{border: "0px solid black", fontSize: 14, padding: 0, color: "rgb(164, 56, 56)", textAlign: "center"}} className="error-message">
                    {error}
                  </Box>
                )}
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

              <Button style={{marginTop: '1px', width: '100%', fontSize:"24px", border:"1px solid white"}}
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
                &nbsp;&nbsp;&nbsp;Or&nbsp;&nbsp;&nbsp;
                <div className="hr"></div>
              </Box>

              <Box style={{border: "0px solid   black", display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: "column", marginTop: 0, marginBottom: 8}}>
                  <Box style={{display: 'flex', border: "0px solid black", padding: 0}}>
                    <div className="oauth"><i className="fa-brands fa-facebook-f" /></div>
                    <div className="oauth"><i className="fa-brands fa-google" /></div>              
                  </Box>
                            
              </Box>

              <Space howmuch={35}/>

              <Box style={{width: "375px", border:"0px solid black"}}>

                 Copyright &#169; 2023 Life Package &#8482;   &nbsp;&nbsp;&nbsp;<a href='4'>Privacy Policty</a>&nbsp;&nbsp;&nbsp; <a href='5'>TOS</a>
              </Box>

          </Box>    
       </Paper>

   </Box>
  
  </div> 
  );
}

export default Login;
