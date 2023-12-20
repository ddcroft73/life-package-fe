
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
import Modal from './Modal.js';


const PasswordRecover = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [modalConfig, setModalConfig] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);    
    const [fadeOut, setFadeOut] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Reset Password: LifePackage 2023";
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
                             width: "100%", backgroundColor: "rgba(0,0,0,0.400)", 
                             borderLeft: `2px solid yellow`, paddingLeft: 8, paddingBottom: 0}}>
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

    return (
            <div className="password-reset-container"
               style={{
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                  borderRadius: 8,
                  maxWidth: 450,
                  width: '100%',
                  margin: 'auto',
                  color: "gray"
                 }}
           >
                
                <Modal
                    show={isModalVisible}
                    content={modalConfig.content}
                    buttons={modalConfig.buttons}
                    borderColor={modalConfig.borderColor}
                />

                <div className="password-reset-logo">
                    <Box style={{
                            textAlign: "center",
                            backgroundColor: "var(--body-background-dark)",//'#484444',
                            border:"0px solid gray", 
                            height:125, 
                            width:"100%", 
                            fontSize: 25,
                            color: "gray",
                            marginBottom: 0}}>
                                <div style={{fontSize: 54, color: "#817Dda"}}>
                                <i className="fa fa-key" /></div> &nbsp;Life Package <span style={{fontSize:18}}>&#8482;</span>                                       
                    </Box>
                <Space howmuch={20} />    
                </div>
                    <Box  style={{ backgroundColor:  'transparent', border: "1px solid gray" }}>
                        
                        <div>
                             <div style={{
                                  textAlign: "center",
                                  color: "white"
                                 }}
                             >
                                <h2>Recover Password</h2>
                             </div>
                             <Box style={{color: "white", border: "0px solid gray", paddingTop: 0}}> 
                                  If you have lost your password you can easily reset it. Get the ball rolling by entering your email below.
                             </Box>   
                            
                           <div className={fadeOut ? 'fade-out' : ''}>
                                <div style={{border: "0px solid black", height: 20,  position: "relative", top: 0, borderTop: "none", borderRadius: 0, backgroundColor: ""}}>
                                    {error && (
                                    <Box style={{
                                            border: "0px solid black", 
                                            fontSize: 18, 
                                            padding: 0, 
                                            color: "orange", 
                                            textAlign: "center"
                                        }} className="error-message">
                                        {error}
                                    </Box>
                                    )}
                                </div>
                            </div>

                            <TextBox 
                                id="email" 
                                label="Email*" 
                                value={email} 
                                type="text" 
                                width="100%" 
                                containerPadding={0}  
                                onChange={handleEmail}
                            />
                            <Button onClick={handleSend}  
                              style={{ 
                                border:"1px solid gray",
                                marginTop: 30,
                                }}
                            >
                                Send Reset Link
                            </Button>

                        </div>
                            
                        <Box style={{border: "0px solid gray", padding: 5, marginTop: 5}}>
                            <Box style={{border: "0px solid gray", 
                                         fontSize: 14, 
                                         display: "flex", 
                                         justifyContent: "space-around", 
                                         textAlign: "center", padding: 0}}>
                                <div>
                                    <Link to="/login">Login</Link> 
                                </div>
                                <div>
                                    <Link to="/register">Register</Link>
                                </div>
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
                        <div style={{
                             textAlign: "center",
                             fontSize: 12,

                            }}
                        >
                            Copyright &#169; 2023 Life Package &#8482;   &nbsp;&nbsp;&nbsp;<a href='4'>Privacy Policty</a>&nbsp;&nbsp;&nbsp; <a href='5'>TOS</a>
                        </div>
                    </Box>
            </div>
        );
};

export default PasswordRecover;
