
import React , {useEffect, useState} from 'react';
import './PasswordReset.css'; 

import Box from './elements/Box';
import Button from './elements/Button';
import TextBox from './elements/TextBox';
import { Link, useNavigate } from "react-router-dom";
import { isEmailAddress } from '../api/utils';
import Space from './Space';


const PasswordRecover = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    
    const [fadeOut, setFadeOut] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Reset Password: LifePackage 2023";
    }, []);

    const handleSend = (event) => {
        event.preventDefault();
        if (isEmailAddress(email)){

            console.log(email)

        } else {
            setError("Invalid email address.");    
            setFadeOut(true); 
            setTimeout(() => {
                setError('');
                setFadeOut(false); 
            }, 3000);
        }
        
    };
    
    const handleEmail = (value) => {
        setEmail(value);       
    };

    return (
            <div className="password-reset-container" style={{ backgroundColor: 'transparent' }}>
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
                                <i className="fa fa-lock" /></div> &nbsp;Life Package <span style={{fontSize:18}}>&#8482;</span>                                       
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
