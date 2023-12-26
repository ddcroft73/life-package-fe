import React , { useState, useEffect } from 'react';
import { useNavigate, Link} from "react-router-dom";

import { userLogin } from '../api/api.js';
import Box from "../components/elements/Box.js";
import Button from "../components/elements/Button.js";
import TextBox from '../components/elements/TextBox.js';
import Paper from '../components/elements/Paper.js';
import ToggleSwitch from '../components/elements/ToggleSwitch.js';
import Space from '../components/Space.js';
import Modal from './Modal.js';
import Or from './Or.js';
import { isEmailAddress } from '../api/utils.js';
import Logo from './Logo.js';
import Footer from './elements/Footer.js';
import Links from './Links.js';
import './Login.css';




const  Login = () => {  

  const defaultRememberMeData = JSON.parse(localStorage.getItem('rememberMe')) || {};
  const [isChecked, setChecked] = useState(defaultRememberMeData.value || false);
  const [email, setEmail] = useState(defaultRememberMeData.username || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeOut2, setFadeOut2] = useState(false);
  
  const [modalConfig, setModalConfig] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  let sendRequest = false;

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "User Login: Life Package 2023";
  }, []);

  const handleLoginClick = async () => {
    
    if (email && password) {
      sendRequest = true;
    }

    if (sendRequest) {
      try {
        const response = await userLogin(email, password);
        const {action, user_role} = response;
        

        // All good        
        if (action) {
            // is this an administrator? If it is , then after 2Fa they need to go to admin login
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
        

        // Bad Responses
        else if (response === "inactive user"){
          // show modal
          // Modal is built ust like you would build a component and return it. 
          let currContent = (
          <>
            <div style={{width:"100%", padding:0, color: "orange"}}>
              <div style={{
                          width: "100%", backgroundColor: "rgba(0,0,0,0.600)", 
                          borderLeft: `2px solid orange`, paddingLeft: 8, paddingBottom: 0}}>          
                <h2>User has been deactivated</h2>
              </div>       
            </div>
            <Box style={{
              width:"100%", 
              padding:0, 
              color: "white",
              border: "0px solid black"}}>       
                  The user: <span style={{color:"orange"}}>{email}</span><br/>
                  has been de-activated. <br/><br/>
                  Please contact <Link to="/support" style={{textDecoration: 'underLine'}}>support</Link> for further information.                        
            </Box>
          </>
        );
        showMessageModal(currContent, "orange");
        }

/*  LOCKED OUT  */
        else if (response === "locked out"){
          let currContent = (
            <>
              <div style={{width:"100%", padding:0, color: "red"}}>
                <div style={{
                            width: "100%", backgroundColor: "rgba(0,0,0,0.600)", 
                            borderLeft: `2px solid orange`, paddingLeft: 8, paddingBottom: 0}}>          
                  <h2>User Account Locked Out</h2>
                </div>       
              </div>
              <Box style={{
                width:"100%", 
                padding:0, 
                color: "white",
                border: "0px solid black"}}>       
                  The user: <span style={{color:"orange"}}>{email}</span><br/>
                  has had their account locked out for some reason. <br/><br/>
                  <Box style={{width: "100%", display: "flex", justifyContent: "space-around", borderTop: "0px solid red", border: "0px solid red" }}>
                    <div><Link to="/support" style={{color:"white"}}>Contact Support</Link></div>
                    <div><Link to="/support" style={{color:"white"}}>FAQ</Link></div>
                  </Box>
              </Box>
            </>
          );
          showMessageModal(currContent, "red");

        } 

/*  USER NOT VERIFIED  */
        else if (response === "non-verified"){
            // show modal
            // Modal is built ust like you would build a component and return it. 
            let currContent = (
            <>
              <div style={{width:"100%", padding:0, color: "orange"}}>
                <div style={{
                            width: "100%", backgroundColor: "rgba(0,0,0,0.600)", 
                            borderLeft: `2px solid orange`, paddingLeft: 8, paddingBottom: 0}}>          
                  <h2>User Not Verified</h2>
                </div>       
              </div>
              <Box style={{
                width:"100%", 
                padding:0, 
                color: "white",
                border: "0px solid black"}}>       
                    The user: <span style={{color:"orange"}}>{email}</span><br/>
                    has not been verified on this system. <br/><br/>
                    Check your email and verify to login.                         
              </Box>
            </>
          );
          showMessageModal(currContent, "orange");
        }                      


/*  WRONG CREDS, USER DOESN'T EXIST  */
        else if (response === "wrong credentials") {
          let currContent = (
            <>             
              <div style={{width:"100%", padding:0, color: "orange"}}>
                 <div style={{
                            width: "100%", backgroundColor: "rgba(0,0,0,0.600)", textAlign: 'center',
                            borderLeft: `0px solid orange`, paddingLeft: 8, paddingBottom: 0}}>
                       <h2>Invalid Entry</h2>
                 </div>                 
              </div>
              <Box style={{
                width:"100%", 
                padding:0, 
                color: "white",
                border: "0px solid black"}}>       
                    One of three scenarios is <span style={{color:"orange"}}>True</span>:<br/><br/>
                    1<span style={{color:"orange"}}>.</span> There is no <span style={{color:"orange"}}>{email}</span><br/> in the system.<br/>
                    2<span style={{color:"orange"}}>.</span> There is, and the password is wrong.<br/>
                    3<span style={{color:"orange"}}>.</span> The username\email address is wrong. <br/>                    
              </Box>
              
            </>
      );
        showMessageModal(currContent, "orange");
        console.error(error.message);
        }

/*  NO CONNECTION  */
      } catch (error) {       
         let currContent = (
                <>
                  <div style={{width:"100%", padding:0, color: "red"}}>
                    <div style={{
                            width: "100%", backgroundColor: "rgba(0,0,0,0.600)", textAlign: 'center',
                            borderLeft: `0px solid red`, paddingLeft: 5, paddingBottom: 0}}>
                       <h2>Error:</h2>
                    </div>                    
                  </div>
                  <Box style={{
                    width:"100%", 
                    padding:0, 
                    color: "white",
                    border: "0px solid black"}}>       
                        There seems to be a problem with the connection. Check your
                        internet, or maybe the server is down... Hell I dont't know. Something fucked up.                         
                  </Box>
                </>
          );
            showMessageModal(currContent, "red");
            console.error(error.message);
      }

    } else {
      setError('Missing email or password.');     
      setFadeOut2(true); 
      setTimeout(() => {
        setError('')
        setFadeOut2(false)
      }, 3900);
    } 
  };
  
   const handleUsername = (value) => setEmail(value);
   const handlePassword = (value) => {
       setPassword(value);
       setError('');
    };

    // Predefined actions
    const confirmAction = () =>  navigate('/verify-email', { state: { email: email } }); 
    const cancelAction = () => setIsModalVisible(false);
    
    // Function to show modal with OK button, just for message
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

    // Function to program modal for an action on OK
    const showConfirmModal = (content, borderColor) => {
        setModalConfig({
        content,
        buttons: [
            { text: 'OK', handler: confirmAction },
            //{ text: 'Cancel', handler: cancelAction }
        ],
        borderColor: borderColor
        });
        setIsModalVisible(true);
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
    
      
  const linkData = {
    textOne: "Forgot Password?",
    pathOne: "/recover-password",
    textTwo: "Register a New Account.",
    pathTwo: "/register"
  };
  
  const styles = {
    "oauth": {
      fontSize: 26,
      border: '0px solid gray',
      padding: 2,
      cursor: "pointer",
      color: "#817Daa"
    },
    top_strip: {       
      width: "100%",
      textAlign: "center",
      border: "1px solid gray",
      height: 15,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor: '#817Daa',
      color: "black"
    },
    component_container: {
      width: '100%', 
      height: 'auto', 
      maxWidth: 650, 
      minWidth: 375, 
      border: "0px solid #817Daa", 
      paddingLeft: 10,
      paddingRight: 10,
      display: 'flex', 
      padding: 10,
    },
    copyright_box: {
      border: "1px soid white", 
      textAlign: 'none', 
      fontSize: 12, 
      color: 'gray',
      width: '100%', 
      height: 'auto', 
      maxWidth: 650, 
      minWidth: 375, 
    },
    main_container: {
      backgroundColor: "rgb(12,12,12)", 
      borderRadius: 8, 
      border: "1px solid rgb(53,53,53)", 
      borderTop: 0,
      padding: 0
    },
    inner_main_container: {
      border: "0px solid rgb(53,53,53)", 
    },
    inputs_container: {
      border: "0px solid black",  
      backgroundColor: "transparent"
    },
    toggle_box: {
      border:"0px solid black", 
      fontSize: '14px',
      lineHeight: 1, 
      marginTop: 20,
      padding:0,
      paddingBottom:7,
      color: 'gray',
      paddingLeft: 8,
    },
    button_container: {
      display: "flex", 
      justifyContent: "center"
    },
    button: {
      marginTop: '1px', 
      width: '100%', 
      fontSize:"20px",  
      border:"1px solid gray", 
      lineHeight: 0, 
      height: 35
    
    }
    

  };


  return (  
      <div className={fadeOut ? 'fade-out' : ''}>
        <Logo marginTop={50} marginBottom={50} />  

           <Modal
              show={isModalVisible}
              content={modalConfig.content}
              buttons={modalConfig.buttons}
              borderColor={modalConfig.borderColor}
           />

        <Box  id="component-container"
             style={styles.component_container}
        >
            <Box id="copyRight-box"
                style={styles.copyright_box} 
            >     
                  
                  <Box id="main-container"
                      style={styles.main_container}
                  >
                    <div id="top-strip"
                        style={styles.top_strip}
                    ></div>   

                    <Space howmuch={18} />

                    <Box id="inner-main-container" 
                        style={styles.inner_main_container}
                    >    
                          <div id="inputs-container" 
                              style={styles.inputs_container}
                          >
                            <TextBox  id="email" label="Email*" value={email} type="text" width="100%" containerPadding={0} onChange={handleUsername} />
                            <Space howmuch={8} />
                            <TextBox  id="password" label="Password*" type="password" width="100%" containerPadding={0} onChange={handlePassword}/>
                          </div>
                          
                          <div className={fadeOut2 ? 'fade-out' : ''}>
                              <div style={{border: "0px solid black", height: 25,  position: "relative", top: 10, borderTop: "none", borderRadius: 0, backgroundColor: ""}}>
                                {error && (
                                  <Box style={{border: "0px solid black", fontSize: 20, padding: 0, color: "rgb(164, 56, 56)", textAlign: "center"}} className="error-message">
                                    {error}
                                  </Box>
                                )}
                              </div>
                          </div>

                          <Box id="toggle-box" 
                              style={styles.toggle_box}
                          >
                              <div>
                                <ToggleSwitch value={isChecked} onChange={handleRememberMe}/>&nbsp;&nbsp;Remember me
                              </div>
                          </Box>
                          
                            <div id="button-container"
                                style={styles.button_container}
                            >
                              <Button  onClick={handleLoginClick} 
                                  style={styles.button}
                              >Sign in 
                              </Button> 
                            </div>
                            
                            <Links justifyContent={'space-between'} linkData={linkData}/>                           
                      </Box>              
                 </Box>
                  <Space howmuch={50}/>

                  <Box id="oAuth"
                      style={{border: "0px solid gray", 
                          width: "100%", display: "flex", justifyContent: 'center', 
                          alignItems: 'center', height: 100, marginBottom: 8
                      }}
                  >
                      <Box style={{display: 'flex', border: "0px solid black", padding: 0,}}>
                        <div className="oauth" style={styles.oauth}><i className="fa-brands fa-facebook-f" /></div>
                        <div className="oauth" style={styles.oauth}><i className="fa-brands fa-google" /></div>              
                      </Box>                                  
                  </Box>

                  <Footer marginTop={5}/>
             </Box>    
        </Box>
        
     </div> 
  );
}


export default Login;
