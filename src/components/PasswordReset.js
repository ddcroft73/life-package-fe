import Box from "./elements/Box.js";

import { useLocation, Link } from 'react-router-dom';
import Button from "./elements/Button.js";
import TextBox from "./elements/TextBox.js";
import Space from "./Space.js";
import Logo from "./Logo.js";
import Footer from "./elements/Footer.js";
import { useState } from 'react';
import { verifyPasswordStrength, decodeJwt } from "../api/utils.js";
import Links from "./Links.js";

      
const linkData = {
    textOne: "Changed my mind.",
    pathOne: "/login",
    textTwo: "Register a New Account.",
    pathTwo: "/register"
  };

const styles = {
    top_strip: {       
        width: "100%",
        textAlign: "center",
        border: "1px solid gray",
        height: 18,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#817Daa',
        color: "black"
    },
    component_container: {
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: "auto",
        maxWidth: 650,
        paddingLeft: 10,
        paddingRight: 10,
        minWidth:290,
        border: "0px solid gray",
        width: "100%",
        color: "gray",                      
    },
    main_container: {
        backgroundColor: "rgb(12,12,12)",
        marginTop: 40,
        border: "1px solid rgb(33,33,33)",
        padding: 0,      
    },
    inner_main_container: { // Why? Because I like the look of the black and gray borders together... bow I need to repeat it with all
        textAlign: "center",
        color: "white",
        border: "1px solid black",
        backgroundColor: "transparent",
        padding: 0
    },
    heading: {
        display: "flex", 
        justifyContent: 'center', 
        border: "0px solid white"
    },
    text_container: {
        padding:10, 
        display:"flex", 
        justifyContent: "center",
        alignItems: "center", 
        border: "0px solid gray"
    },
    text_controller: {
        width: "90%",
        textAlign: "center",
    },
    button: {
        width: "100%",
        fontWeight: "bold",
        fontSize: 18,               
    },
};


const PasswordReset = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
  
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
 
    const handleNewPassword = (value) => {
        setNewPassword(value);
    };
    const handleConfirmPassword = (value) => {
        setConfirmPassword(value);
    };
   
    const sendRequest = () => {
        alert(`Response: ${newPassword}, ${confirmPassword}`);
    };
   
   
    return (
        <Box id="component-container"
             style={styles.component_container}
        >
          <Logo marginTop={40} marginBottom={60} />
          <Box id="main-container"
              style={styles.main_container}
          >
                <Box id="inner-main-container"
                    style={styles.inner_main_container}
                >
                    <div id="top-strip"
                        style={styles.top_strip}
                    ></div>
    
                    <div id="heading"
                        style={styles.heading}>
                        <div>
                            <h2>Password Reset</h2>
                        </div>                      
                    </div>

                    <Box id="text-container"
                        style={styles.text_container}>
                        <div id="text-controller"
                            style={styles.text_controller}
                        >
                           Enter the new password. Retype it to confirm.       
                        </div>
                    </Box>             
                    
                    <Box style={{border:0}}>
                        <TextBox id="new-password" label="New Pasword *" type="password" width="100%" containerPadding={0} onChange={handleNewPassword} />
                        <Space howmuch={8} />
                        <TextBox id="confirm-password" label="Confirm Password *" type="password" width="100%" containerPadding={0}onChange={handleConfirmPassword} />
                    </Box> 

                    <Space howmuch={25} />

                    <Box id="button-container"
                      style={{border: 0}}
                    >
                        <Button
                            onClick={sendRequest}
                            style={styles.button}
                        > Submit
                        </Button>

                    <Links justifyContent="space-between" linkData={linkData}/>
                    </Box>    
            </Box>          
      </Box>
        <Footer marginTop={80} />
    </Box>
    );
};
export default PasswordReset;
