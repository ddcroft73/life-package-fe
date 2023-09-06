import React, { useContext } from 'react';
import { userLogin } from '../api/api.js';
import { useState } from 'react';
import Box from "../components/elements/Box.js";
import Button from "../components/elements/Button.js";
import TextBox from '../components/elements/TextBox.js'
import ThemeContext from '../theme/ThemeContext';
import Paper from '../components/elements/Paper.js'


const  Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { theme, setTheme } = useContext(ThemeContext);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    try {
      const user = await userLogin(email, password);
      // handle successful login, e.g., update state, redirect, etc.

      console.log(user)

    } catch (error) {
      // handle error, e.g., show a notification, update state, etc.
    }
  }
  return (

   <Box  style={{minWidth: "300px", maxWidth: "600px", border: "0px solid black",
   display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
       <Paper elevation={4}   
            style={{
              width: '375px', 
              height: '420px', 
              backgroundColor: '#444444',
            }}>

           
           <Box style={{ border:'none',height:'auto', width:'100%', padding: 0, display: 'flex', justifyContent: 'center',}}>
              <Box style={{backgroundColor:'#444444',border:"1px solid #4c3cc7",height:45, width:195}}>Login</Box>
           </Box>
           <TextBox  label="UserName" type="text" width="100%" containerPadding={0} />
           <TextBox  label="Password" type="password" width="100%" containerPadding={0} />
       </Paper>
   </Box>
   
  );
}

export default Login;
