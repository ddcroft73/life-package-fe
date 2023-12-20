import Box from "./elements/Box.js";

import { useLocation } from 'react-router-dom';
import Button from "./elements/Button.js";
import TextBox from "./elements/TextBox.js";
import Space from "./Space.js";
import { useState } from 'react';

/*
const PasswordReset = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
  
    console.log(token)

    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px",
                width: 500,
                color: "gray"
            }}
        >
            <Box>
                <h1>Password Reset</h1>
                Component shouldbe two input boxes... 
            </Box>
        </Box>
    );
};
*/
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
               marginTop: 20,
               height: "auto",
               maxWidth: 650,
               minWidth:375,
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
               marginBottom: 15}}
         >
           <Box style={{
                textAlign: "center",
                backgroundColor: "transparent",
                border:"0px solid #817Daa",
                height:125,
                width:"100%",
                fontSize: 25,
                marginBottom: 0,
                color: 'gray',
                fontWeight: 'normal'}}
           >
               <div style={{fontSize: 54, color: "#817Dda"}}>
                 <i className="fas fa-key" />
               </div> &nbsp;Life Package <span style={{fontSize:25}}>&#8482;</span>           
           </Box>
          
        </Box>
         
        <Box className="main-container"
            style={{
              backgroundColor: "rgb(22,22,22);",
              marginTop: 10,
              border: "1px solid gray",
            }}
        >
            <div style={{
               textAlign: "center",
               color: "white",
               border: "0px solid gray",
               backgroundColor: "transparent",
               padding: 5
              }}
            >
              <div>
                <h2>Reset Password</h2>
              </div>
              <div style={{
                     marginBottom: 30
                   }}
              >
                 Enter the new password, and then confirm the password below.        
              </div>
            
               <TextBox 
                  id="new-password"
                  label="New Pasword *"
                 
                  type="password"
                  width="100%"
                  containerPadding={0}
                  onChange={handleNewPassword}
               />
               <Space howmuch={18} />
               <TextBox 
                  id="confirm-password"
                  label="Confirm Password *"
                  type="password"
                  width="100%"
                  containerPadding={0}
                  onChange={handleConfirmPassword}
               />

           <Space howmuch={25} />
        
            <Button
                style={{
                    width: "100%",
                    backgroundColor: 'gray',
                    fontWeight: "bold",
                    fontSize: 18,               
                }}
                onClick={handleSubmit}
            > Submit
            </Button>
            </div>
           
             <Box className="links"
                  style={{
                      display: "flex",
                      justifyContent: "space-around",
                      fontSize: 12,
                      color: "blue",
                      border: "0px solid gray",
                  }}>
               <Box style={{border:0}}>
                   Login
               </Box>
               <Box style={{border:0}}>
                   Register
               </Box>
            </Box>
          
       </Box> {/* End main-container*/}
           <Box className="footer"
              style={{
                  height: 120,
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
             <div style={{
                textAlign: "center",
                fontSize: 12,
                }}
             >
               Copyright &#169; 2023 Life Package &#8482;   &nbsp;&nbsp;&nbsp;<a href='4'>Privacy Policty</a>&nbsp;&nbsp;&nbsp; <a href='5'>TOS</a>
             </div>
           </Box>
      </Box>
    );
};
export default PasswordReset;
