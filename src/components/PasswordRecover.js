
import React , {useEffect, useState} from 'react';
import './PasswordReset.css'; 

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

    const handleSend = async (event) => {
        event.preventDefault();

        // Predefined actions
        //const confirmAction = () =>  navigate('/verify-email', { state: { email: email } }); 
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

        if (isEmailAddress(email)){
            ///api/v1/auth/password-recovery/{email}
            console.log(email)
            const endPoint = `${BASE_URL}/auth/password-recovery/${email}`;
            console.log(endPoint)

            try {
                const response = await axios.post(endPoint);
                const {msg} = response.data;

                if (response.status_code === 200) {
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
            <div className="password-reset-container" style={{ backgroundColor: 'transparent' }}>
            <Modal
                show={isModalVisible}
                content={modalConfig.content}
                buttons={modalConfig.buttons}
            />


                <div className="password-reset-logo">
                    <Box style={{
                            textAlign: "center",
                            backgroundColor: "var(--body-background-dark)",//'#484444',
                            border:"0px solid #817Daa", 
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
                    <Box  style={{ backgroundColor:  'rgb(22,22,22)', border: "1px solid #817Dda" }}>
                        <form>
                            <div>
                             <Box style={{color: "white", border: "0px solid gray"}}> 
                            If you lost your password you can reset it by entering your email below.
                            </Box>   
                            
                           <div className={fadeOut ? 'fade-out' : ''}>
                                <div style={{border: "0px solid black", height: 20,  position: "relative", top: 0, borderTop: "none", borderRadius: 0, backgroundColor: ""}}>
                                    {error && (
                                    <Box style={{border: "0px solid black", fontSize: 20, padding: 0, color: "rgb(164, 56, 56)", textAlign: "center"}} className="error-message">
                                        {error}
                                    </Box>
                                    )}
                                </div>
                            </div>

                            <TextBox 
                                id="email" 
                                label="Email*" 
                                value={email} 
                                type="text" width="100%" containerPadding={0}  onChange={handleEmail}/>
                            <Button onClick={handleSend}  style={{ border:"1px solid gray",}}>
                                Send Reset Link
                            </Button>
                            </div>
                        </form>
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

                    
            </div>
        );
};

export default PasswordRecover;
