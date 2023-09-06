import React, { useContext } from 'react';
import { userLogin } from '../api/api.js';
import { useState } from 'react';
import Box from "../components/elements/Box.js";
import Button from "../components/elements/Button.js";
import TextBox from '../components/elements/TextBox.js'
import ThemeContext from '../theme/ThemeContext';


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

   <Box  style={{ padding: '10px', width: 400}}>
       <Button>Click me</Button>
       <TextBox  label="Username" type="text" width="300px"/>
   </Box>
   
  );
}

export default Login;
