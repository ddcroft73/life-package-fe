
import React , {useEffect, useState} from 'react';
import './PasswordRecover.css'; 

import Box from './elements/Box';
import Button from './elements/Button';
import TextBox from './elements/TextBox';
import { Link, useNavigate } from "react-router-dom";
import { isEmailAddress } from '../api/utils';
import Space from './Space';
import { BASE_URL } from '../api/settings';
import axios from "axios";
import Logo from './Logo.js';
import Links from './Links.js';
import Footer from './elements/Footer.js';
import Modal from './Modal.js';


const PasswordRecover = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [modalConfig, setModalConfig] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);    
    const [fadeOut, setFadeOut] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Reset Password: LifePackage 2024";
    }, []);

    // Predefined actions
    //const confirmAction = () =>  navigate('/verify-email', { state: { email: email } }); 
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


    const handleSend = async () => {    

        if (isEmailAddress(email)){
            ///api/v1/auth/password-recovery/{email}
            const endPoint = `${BASE_URL}/auth/password-recovery/${email}`;

            try {
                //let msg = `A password recovery email has been sent to ${email}.`
                const response = await axios.post(endPoint);
                const {msg} = response.data;

                if (msg) {                    
                    let sentence = msg.split(" ");
                    let currContent = (
                        <>
                          <div style={{width:"100%", padding:0, color: "green"}}>
                          <div style={{
                             width: "100%", backgroundColor: "rgba(0,0,0,0.800)", textAlign:"center", 
                             borderLeft: `0px solid yellow`, paddingLeft: 8, paddingBottom: 0}}>
                             <h2>Email Sent!</h2>
                         </div>    
                            
                          </div>
                          <Box style={{
                            width:"100%", 
                            padding:0, 
                            color: "white",
                            border: "0px solid black"}}>       
                            {sentence.map((word, index) => (
                                `${word} `  // playing with this
                            ))}                         
                          </Box>
                        </>
                  );
                    showMessageModal(currContent, "green");
                }

            } catch(error) {
                if (error.response) {
                    console.error('Error status:', error.response.status);                    
                   if (error.response.status >= 400) {               
                    setError(error.response.data.detail);    
                    setFadeOut(true); 
                    setTimeout(() => {
                        setError('');
                        setFadeOut(false); 
                    }, 3900);  // The extra 900 ms allows the Error to pop back up a second.
                      
                   }
               }    
            }

        } else {
            setError("Invalid email address.");    
            setFadeOut(true); 
            setTimeout(() => {
                setError('');
                setFadeOut(false); 
            }, 3900);
        }
        
    };
    
    const handleEmail = (value) => {
        setEmail(value);       
    };

    const styles = {
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
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 20,
            paddingRight: 20,  // so the sides are intact on mobile
            borderRadius: 8,
            maxWidth: 450,
            width: '100%',
            color: "gray",
        },
        outer_container: {
            padding:0,
            border:0
        },
        inner_container: {
            border: "1px solid rgb(50,50,50)",
            padding: 0
        },
        heading: {
            textAlign: "center",
            color: "white",
            border: "0px solid white"
        },
        text_content: {
            color: "white", 
            border: "0px solid gray", 
            paddingTop: 0
        },
        error_message: {  
            border: "0px solid black", 
            height: 20,  
            position: "relative", 
            top: 0, 
            borderTop: "none", 
            borderRadius: 0, 
            backgroundColor: "transparent",
            inner: {          
                border: "0px solid black", 
                fontSize: 18, 
                padding: 0, 
                color: "orange", 
                textAlign: "center"
            }      
        },
        button: {
            border:"1px solid gray",
            marginTop: 30, 
            width: "100%"
        },
    };
    
    const linkData = {
        textOne: "Login",
        pathOne: "/login",
        textTwo: "Customer Support",
        pathTwo: "/support"
    };

    
    return (
            <div id="component-container"
               style={styles.component_container}
            >
             <Logo marginTop={50} marginBottom={50}/>
                <Modal
                    show={isModalVisible}
                    content={modalConfig.content}
                    buttons={modalConfig.buttons}
                    borderColor={modalConfig.borderColor}
                />                      
        
                    <Box id="outer-container"
                        style={styles.outer_container}
                    >
                         <Box id="inner-container"
                             style={styles.inner_container}
                         >
                            <div id="top-strip"
                                style={styles.top_strip}
                            ></div> 
                   <Box style={{border:0}}>
                        <Box id="heading" 
                              style={styles.heading}
                        >
                                <h2>Recover Password</h2>
                             </Box>
                             <Box id="text-content"
                                 style={styles.text_content}> 
                                  If you have lost your password you can easily reset it. Get the ball rolling by entering your email below.
                             </Box>   
                            
                             <div className={fadeOut ? 'fade-out' : ''}>
                                <div id="error-message" style={styles.error_message}>
                                    {error && (
                                    <Box id="inner"
                                        style={styles.error_message.inner}>
                                        {error}
                                    </Box>
                                    )}
                                </div>
                             </div>

                            <TextBox id="email" label="Email*" type="text" width="100%" containerPadding={0} onChange={handleEmail} />
                            <Button 
                              style={styles.button}
                              onClick={handleSend}  
                            >
                              Send Reset Link
                            </Button>
                       
                            <Links justifyContent='space-around' linkData={linkData} />                            
                        </Box> 
                  </Box>
                </Box> 

                    <Box className='footer'
                       style={{
                         height: 100,
                         display: 'flex',
                         flexDirection: 'column',
                         border: '0px solid gray'
                       }}
                    >
                        <div style={{
                            flex: 1,
                        }}>

                        </div>
                        <Footer />
                    </Box>
            </div>
        );
};

export default PasswordRecover;
