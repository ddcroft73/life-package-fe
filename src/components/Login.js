import React , { useState, useEffect } from 'react';
import { useNavigation, useLocation, useNavigate, Link} from "react-router-dom";
import { userLogin } from '../api/api.js';
import Admin from "./AdminLogin.js";
import Box from "../components/elements/Box.js";
import Button from "../components/elements/Button.js";
import TextBox from '../components/elements/TextBox.js';
import Paper from '../components/elements/Paper.js';
import ToggleSwitch from '../components/elements/ToggleSwitch.js';
import Space from '../components/Space.js';
import Modal from './Modal.js';
import Or from './Or.js';
import { isEmailAddress } from '../api/utils.js';
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
    document.title = "User Login: LifePackage 2023";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();     
    
    if (email && password) {
      sendRequest = true;
    }

    if (sendRequest) {
      try {
        const response = await userLogin(email, password);
        const {action, user_role} = response;
        
        
        console.log(`response: ${response}`)
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
        
        // Bad Response
        else if (response === "inactive user"){
          console.log(response);
        }
        else if (response === "locked out"){
          console.log(response);
        } 
        else if (response === "non-verified"){
            // show modal
            // Modal is built ust like you would build a component and return it. 
                   let currContent = (
                    <>
                      <div style={{width:"100%", padding:0, color: "red"}}>
                         <h2>Error:</h2>
                      </div>
                      <Box style={{
                        width:"100%", 
                        padding:0, 
                        color: "gray",
                        border: "0px solid black"}}>       
                            The user: <span style={{color:"orange"}}>{email}</span> has not 
                            been verified on this system. <br/><br/>
                            Check your email and verify to login.                         
                      </Box>
                    </>
                  );
                  showMessageModal(currContent);
        }                      
        else if (response === "wrong credentials") {
          let currContent = (
            <>             
              <div style={{width:"100%", padding:0, color: "orange"}}>
                <h2>Invalid entry:</h2>
              </div>
              <Box style={{
                width:"100%", 
                padding:0, 
                color: "white",
                border: "0px solid black"}}>       
                    One of three scenarios is True:<br/><br/>
                    1<span style={{color:"orange"}}>.</span> There is no <span style={{color:"orange"}}>{email}</span> in the system.<br/>
                    2<span style={{color:"orange"}}>.</span> There is and the password is wrong.<br/>
                    3<span style={{color:"orange"}}>.</span> The username\email address is wrong. <br/>                    
              </Box>
              
            </>
      );
        showMessageModal(currContent);
        console.error(error.message);
        }

      } catch (error) {       
         let currContent = (
                <>
                  <div style={{width:"100%", padding:0, color: "red"}}>
                    <h2>Error:</h2>
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
            showMessageModal(currContent);
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
  // justifyContent: 'center', alignItems: 'center', 
  return (
  
  <div className={fadeOut ? 'fade-out' : ''}>
   <Box  style={{ border: "0px solid #817Daa", display: 'flex', padding: 0}}>
      
            <Modal
                show={isModalVisible}
                content={modalConfig.content}
                buttons={modalConfig.buttons}
            />

       <Paper elevation={0}   variant="outlined"
            style={{
              width: '375px', 
              height: '555px', 
              backgroundColor: "transparent",//'var(--body-background-dark-1)',
              border: "0px solid #817Daa",
            }}>

          <Box className="copyRight-box" style={{border: "1px soid #817Daa", textAlign: 'none', fontSize: 12, color: 'gray'}} >     

              <Box style={{ border:"1px soid white",
                           height:'auto', width:'100%',
                           padding: 0, display: 'flex', 
                           justifyContent: 'center',
                           marginBottom: 15}}>
                  <Box style={{
                    textAlign: "center",
                    backgroundColor: "var(--body-background-dark)",//'#484444',
                    border:"0px solid #817Daa", 
                    height:125, 
                    width:"100%", 
                    fontSize: 25,
                    marginBottom: 0}}>
                      <div style={{fontSize: 54, color: "#817Dda"}}>
                      <i className="fas fa-sign-in-alt" /></div> &nbsp;Life Package <span style={{fontSize:18}}>&#8482;</span>            
                    
                  </Box>
              </Box>

              <Space howmuch={8} />

            <Box style={{backgroundColor: "rgb(22, 22, 22)", borderRadius: 8, border: "1px solid #817Daa"}}>
              <div style={{border: "0px solid black",  backgroundColor: ""}}>
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

              <Box className="toggle-box" style={{
                    border:"0px solid black", 
                    fontSize: '14px',
                    lineHeight: 1, 
                    marginTop: 20,
                    padding:0,
                    paddingBottom:7,
                    color: 'gray'}}>
                  <div>
                  <ToggleSwitch value={isChecked} onChange={handleRememberMe}/>&nbsp;&nbsp;Remember me
                  </div>
              </Box>
              <div style={{display: "flex", justifyContent: "center"}}>
                <Button style={{marginTop: '1px', width: '100%', fontSize:"20px",  
                border:"1px solid gray", lineHeight: 0, height: 35}}
                    onClick={handleSubmit}>Log in 
                </Button> 
              </div>
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
              
              </Box>              

              <Space howmuch={50}/>
             {/* <Or title={"OAuth?"}/> */}
              <Box style={{border: "0px solid black", backgroundColor: "", width: "100%", display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: "column", marginTop: 0, marginBottom: 8}}>
                  <Box style={{display: 'flex', border: "0px solid black", padding: 0, backgroundColor: ""}}>
                    <div className="oauth" style={styles.oAuth}><i className="fa-brands fa-facebook-f" /></div>
                    <div className="oauth" style={styles.oAuth}><i className="fa-brands fa-google" /></div>              
                  </Box>
                            
              </Box>

              <Space howmuch={5}/>

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


const styles = {
    "oAuth": {
      fontSize: 26
    },

};