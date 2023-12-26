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
   
    const handleSubmit = () => {
        alert(`Response: ${newPassword}, ${confirmPassword}`);
    };
   
   
    return (
        <Box className="component"
             style={{
               display:'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               marginTop: 60,
               height: "auto",
               maxWidth: 650,
               paddingLeft: 10,
               paddingRight: 10,
               minWidth:290,
               border: "0px solid gray",
               width: "100%",
               color: "gray",
               
              
             }}
        >
            

         <Box className="logo-container"
             style={{
               border:"1px soid white",
               height:'auto', width:'100%',
               padding: 0, display: 'flex',
               justifyContent: 'center',
               marginBottom: 15,
            }}
         >
                     <Logo />
        </Box>
        
        <Box className="main-container"
            style={{
              backgroundColor: "rgb(12,12,12)",
              marginTop: 40,
              border: "1px solid rgb(33,33,33)",
              padding: 0,
              
            }}
        >
            <div style={{
               textAlign: "center",
               color: "white",
               border: "0px solid gray",
               backgroundColor: "transparent",
               padding: 0
              }}
            >
             <div id="top-strip"
                style={styles.top_strip}
             ></div>
  
                <div style={{display: "flex", justifyContent: 'center', border: "0px solid white"}}>
                    <div style={{display: "flex", border: "0px solid white"}}>
                    <h2>Password Reset</h2>
                    </div>
                    <div style={{fontSize: 34, color: 'orange', paddingLeft: 12, display: "flex", justifyContent: 'center', alignItems: "center", border: "0px solid white"}}>
                        <i className="fas fa-keys" />
                    </div>    
                </div>
<Box style={{padding:10, display:"flex", justifyContent: "center", alignItems: "center", border: "1px solid gray"}}>
              <div style={{
                     marginBottom: 30,
                     padding: 10,
                     width: "90%",
                     textAlign: "left",
                   }}
              >
                 Enter the new pIssword, and then retype it again to confirm.       
              </div>
</Box>             
              <Box style={{border:0}}>
                <TextBox 
                    id="new-password"
                    label="New Pasword *"
                    
                    type="password"
                    width="100%"
                    containerPadding={0}
                    onChange={handleNewPassword}
                />
                <Space howmuch={8} />
                <TextBox 
                    id="confirm-password"
                    label="Confirm Password *"
                    type="password"
                    width="100%"
                    containerPadding={0}
                    onChange={handleConfirmPassword}
                />
            </Box> 
           <Space howmuch={25} />
            <Box style={{border:0}}>
                <Button
                    style={{
                        width: "100%",
                        fontWeight: "bold",
                        fontSize: 18,               
                    }}
                    onClick={handleSubmit}
                > Submit
                </Button>
            </Box>    
            </div>
            <Links justifyContent="space-around" linkData={linkData} />
            
          
       </Box>
       
           <Box className="footer"
              style={{
                  height: 80,
                  display: 'flex',
                  flexDirection: 'column',
                  border: "0px solid gray",
              }}
           >
             <div style={{
                flex: 1,
               }}
             >
             </div>        
             <Footer />
           </Box>
      </Box>
    );
};
export default PasswordReset;
