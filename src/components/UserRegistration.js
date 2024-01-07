import React from 'react';
import { userRegister } from '../api/api.js';
import { isEmailAddress, verifyPasswordStrength } from '../api/utils.js';
import { useState, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from "../components/elements/Box.js";
import Paper from "../components/elements/Paper.js";
import TextBox from "../components/elements/TextBox.js";
import Button from "../components/elements/Button.js";
import Space from "../components/Space.js";
import Footer from './elements/Footer.js';
import Links from './Links.js';
import Modal from './Modal';
import Logo from './Logo.js';
import Oauth from './Oauth.js';
import './RegisterUser.css'
/**
 *  UserRegistration Component
 *    THe first component i did not generate. Almost all my componsnts for this application are built a birt different.
 *    Some have css files, some have inline style, some have the inline style defined in objects that are separate from
 *    the JSX, style={} and others are defined directly inside the JSX styles={{}}. I have changed what I thought was the
 *    most readable way several times and i think I am going with the design of this component. 
 * 
 *    1. One main function that is the component, conventional function declaration.
 *    2. All state in that function
 *    3. All handlers nested at the top, => arrow functions.
 *    4. useEffect next for applying code as in media queries. (I cant get it to work wit css files.)
 *    5. All other helper functions => arrow functions nested as well.
 *    6. Styles object defines at bottom to style the component
 * 
 * @returns null
 */


function UserRegistration() {
    const [email, setEmail] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [namesContainerStyle, setNamesContainerStyle] = useState({});

    const [message, setMessage] = useState('');
    const [fadeOut2, setFadeOut2] = useState('');
    const [modalConfig, setModalConfig] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigate = useNavigate();
    let sendRequest = false;

    // HANDLERS
    const handleEmail = (value) => {
        setEmail(value);
    };
    const handlePasswordOne = (value) => {
        setPasswordOne(value);
    };
    const handlePasswordTwo = (value) => {
        setPasswordTwo(value);
    };
    const handleFirstName = (value) => {
        setFirstName(value);
    }; 
    const handleLastName = (value) => {
        setLastName(value);
    };


    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 600) {
                setNamesContainerStyle({
                    flexDirection: 'column',
                });
            } else {
                setNamesContainerStyle({
                    flexDirection: 'row',
                });
            }
        }    

        document.title = "User Registration: LifePackage 2024";

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);

    }, []);
    

    // MODAL FUNCTIONS
    const successAction = () =>  navigate('/verify-email', { state: { email: email } }); 
    const okAction = () => setIsModalVisible(false);
     
    const showMessageModal = (content, borderColor) => {
        setModalConfig({
        content,
        buttons: [
            { text: 'OK', handler: okAction }
        ],
        borderColor: borderColor
        });
        setIsModalVisible(true);
    };


    // Function to program modal for an action on OK
    const showSuccessModal = (content, borderColor) => {
        setModalConfig({
        content,
        buttons: [
            { text: 'OK', handler: successAction },
            //{ text: 'Cancel', handler: cancelAction }
        ],
        borderColor: borderColor
        });
        setIsModalVisible(true);
    };
    
    const createNewUserAccount = async () => {
        
        let userData = {};
        let sendRequest = true;
        
        if (firstName && lastName) {
            userData.fullName = `${firstName} ${lastName}`;
        }


        if (!isEmailAddress(email)) {           

           if (email.length === 0) {
                setMessage(`Email cannot be empty.`)  
                setFadeOut2(true); 
                setTimeout(() => {
                setMessage('')
                setFadeOut2(false)
                }, 3900);
           } else {            
                setMessage(`${email} is not a valid email address.`)  
                setFadeOut2(true); 
                setTimeout(() => {
                setMessage('')
                setFadeOut2(false)
                }, 3900);
           }
            sendRequest = false;
        }  

        else if (passwordOne !== passwordTwo) {
            setMessage("Passwords do not match.");
            setTimeout(() => setMessage(""), 3000);
            sendRequest = false;
        } else {          
            console.log("checking strength")             
            const goodPassword = verifyPasswordStrength(passwordOne); 
            if (goodPassword.length > 0) {           
                let currContent = (
                <>
                    <div style={{width:"100%", padding:0, color: "orange"}}>
                        <div style={{
                            width: "100%", borderRadius:15, backgroundColor: "rgba(0,0,0,0.600)", textAlign: 'center',
                            borderLeft: `0px solid orange`, paddingLeft: 5, paddingBottom: 0}}>
                        <h2>Bad Password</h2>
                        </div>                    
                    </div>
                    <Box style={{
                    width:"100%", 
                    padding:0, 
                    color: "gray",
                    border: "0px solid black"}}>         
                        Satisfy the following issues with your password:<br />          
                        <ul>
                        {goodPassword.map((item, index) => (
                            <li key={index}><span style={{color:"white"}}>{item}</span></li>
                        ))}
                        </ul>

                    </Box>
                </>
                );

                showMessageModal(currContent, "orange");      
                sendRequest = false;      
            }
        }

        userData.email = email;
        userData.password = passwordOne;

        if (sendRequest) {
            /*
           // DEBUG code, to test all responses. Error and success.
            let response = {
                user: {
                    email: ""
                }
            };
            response.error = 'no response'
           //response.user.email = email
           */

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
                      <div style={{width:"100%", padding:0, color: "white"}}>
                        <div style={{
                            width: "100%", backgroundColor: "rgba(0,0,0,0.600)", textAlign: 'center',
                            borderLeft: `0px solid red`, paddingLeft: 5, borderRadius: 15, paddingBottom: 0}}>
                                <h2>Success!</h2>
                        </div>
                      </div>
                      <Box style={{
                        width:"100%", 
                        padding:0, 
                        color: "gray",
                        border: "0px solid black"}}>  
                            An account was created for: &nbsp;<span style={{color:"orange"}}>{email}</span>.  
                            
                      </Box>
                    </>
                  );
                   showSuccessModal(currContent, "blue");                 
                   
            }
            else {
               if (error === "user exists") {
                   // show modal
                   //alert("User exists")
                   let currContent = (
                    <>
                      <div style={{width:"100%", padding:0, color: "red"}}>
                        <div style={{
                            width: "100%", backgroundColor: "rgba(0,0,0,0.600)", textAlign: 'center',
                            borderLeft: `0px solid red`, paddingLeft: 5, borderRadius: 5, paddingBottom: 0}}>
                                <h2>Error</h2>
                        </div>
                      </div>
                      <Box style={{
                        width:"100%", 
                        padding:0, 
                        color: "gray",
                        border: "0px solid black"}}>       
                            The user: <span style={{color:"orange"}}>{email}</span> already exists.
                        
                      </Box>
                    </>
                  );
                  showMessageModal(currContent, "orange");

               } else if (error === 'server closed') {
                   // show modal
                   let currContent = (
                    <>
                       <div style={{width:"100%", padding:0, color: "red"}}>
                         <div style={{
                                width: "100%", backgroundColor: "rgba(0,0,0,0.600)", textAlign: 'center',
                                borderLeft: `0px solid red`, paddingLeft: 5, borderRadius:5, paddingBottom: 0}}>
                            <h2>Error</h2>
                         </div>                    
                      </div>
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

                  showMessageModal(currContent, "red");

               } else if (error === "no response") {
                    // show modal
                    let currContent = (
                        <>
                        <div style={{width:"100%", padding:0, color: "red"}}>
                         <div style={{
                                width: "100%", backgroundColor: "rgba(0,0,0,0.600)", textAlign: 'center',
                                borderLeft: `0px solid red`, borderRadius:5, paddingLeft: 5, paddingBottom: 0}}>
                            <h2>Error</h2>
                         </div>                    
                      </div>
                        <Box style={{
                            width:"100%", 
                            padding:0, 
                            color: "white",
                            border: "0px solid black"}}>       
                                There seems to be a problem with your connection. <br/>Check your
                                internet connection.                        
                        </Box>
                        </>
                    );
                    showMessageModal(currContent, "red");


               }else {
                    // show modal
                   // Unknown error
                   let currContent = (
                    <>
                      <div style={{width:"100%", padding:0, color: "red"}}>
                         <div style={{
                                width: "100%", backgroundColor: "rgba(0,0,0,0.600)", textAlign: 'center',
                                borderLeft: `0px solid red`, paddingLeft: 5, paddingBottom: 0}}>
                            <h2>Error</h2>
                         </div>                    
                      </div>
                      <Box style={{
                        width:"100%", 
                        padding:0, 
                        color: "gray",
                        border: "0px solid black"}}>                            
                          <span style={{color:"white"}}>{error}</span>.
                      </Box>
                    </>
                  );
                  showMessageModal(currContent, "orange");
               }
            }
        }               
    };


    return (
        <div id='background'>

           <Modal
              show={isModalVisible}
              content={modalConfig.content}
              buttons={modalConfig.buttons}
              borderColor={modalConfig.borderColor}
           />

            <Logo marginTop={50} marginBottom={30}/>

            <Box id="component-container"
                style={styles.comp_container}
            >
                  
                <Box id="inner-container"
                    style={styles.inner_container}
                >
                    <div id="top-strip"
                    style={styles.top_strip}
                    >                
                    </div> 
                    <Box id="grouping-container">
                        <Box style={styles.text_content}>
                            <h2>Register A New Account</h2>
                            <div id="sub-content" 
                                style={styles.sub_content}
                            >
                                Enter the required information below to create an account. If you prefer, you may also use your Facebook or Google account and 
                                gain access through them. 
                            </div>
                        </Box>

                        <div className={fadeOut2 ? 'fade-out' : ''}>
                            <Box style={{border: "0px solid white",height: 10, position: 'relative', top: -15}}>
                            {message && (
                            <Box style={{border: "0px solid white", lineHeight: 2, fontSize: 14, padding: 0, color: "orange", textAlign: "center"}} className="error-message">
                                {message}
                            </Box>
                                )}
                            </Box >   
                        </div>

                        <Box id="creds-container" caption={"Required Fields"} color={'white'} labelBgColor={"rgb(15,15,15)"}
                            style={styles.creds_container}
                        >
                            <TextBox  id="email" label="Email *" type="text" width="100%" containerPadding={0} onChange={handleEmail} />
                            <TextBox  id="password1" label="Password *"  type="password" width="100%" containerPadding={0} onChange={handlePasswordOne} />
                            <TextBox  id="password2" label="Retype-Password *"  type="password" width="100%" containerPadding={0} onChange={handlePasswordTwo} />        
                        </Box>      
                        <Box id="names-container" caption={"Optional Fields"}  color={'white'}  labelBgColor={"rgb(15,15,15)"}
                            style={{
                                ...styles.names_container,
                                ...namesContainerStyle 
                            }}
                        >
                            <TextBox  id="first-name" label="First Name" type="text" width="100%" containerPadding={0} onChange={handleFirstName} />
                            <TextBox  id="last-name" label="Last Name"  type="text" width="100%" containerPadding={0} onChange={handleLastName} />                    
                        </Box>      

                        <Button id="register-button" onClick={createNewUserAccount}
                            style={styles.button}
                        >
                            Register                    
                        </Button>       

                        <Links linkData={linkData}/>       
                   </Box>
                </Box> 

                <Oauth/>
                <Footer marginTop={5} marginBottom={20}/>

            </Box>

       </div>
    );
};

const linkData = {
    textOne: "Login",
    pathOne: "/login",
    textTwo: "FAQ",
    pathTwo: "/FAQ"
};

const styles = {
    "oAuth": {
        fontSize: 26,
        border: '0px solid gray',
        padding: 2,
        cursor: "pointer",
        color: "#817Daa"    
    },
    comp_container: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 575,
        minWidth: 290,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "transparent",//"rgb(12,12,12)",
        color: "gray",
        width: "100%",
        height: "auto", 
        padding: 0,
        border: "0px solid black"
    },
    inner_container: {
        width: "100%",
        height: "auto",
        backgroundColor: "rgb(15,15,15)",
        border: "1px solid rgb(33,33,33)",
        padding:0
    },
    top_strip: {
        width: "100%",
        border: "0px solid gray",
        height: 15,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#819DCc'
    },
    creds_container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
        border: "1px solid #817Daa",
        marginBottom: 10,
        marginTop: 10,
        paddingTop: 15
    }, 
    names_container: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        paddingTop: 15,
        marginTop: 15,
        border: "1px solid #817Daa",
    },
    text_content: {
        textAlign: "center",
        color: "white",
        padding: 0,
        border: "0px solid gray",
    },
    sub_content: {
        color: "gray",
        border: "0px solid gray",
        marginBottom: 0,
        textAlign: "center",
        padding: 12,
    },
   
    button: {
        fontSize: 18,
        width: "100%",
        marginTop: 20
    }
};

export default UserRegistration;