import React from 'react';
import './RegisterUser.css';
import { userRegister } from '../api/api.js';
import { isEmailAddress } from '../api/utils.js';
import Box from "../components/elements/Box.js";
import Paper from "../components/elements/Paper.js";
import { useState } from 'react';


const RegisterUser = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        let userData = {};
        let sendRequest = true;
        
        if (fullName) {
            userData.fullName = fullName;
        }
        if (!isEmailAddress(email)) {
            console.log(`${email} is not a valid email address. Try again mfr...`);
            sendRequest = false;
        }        
        if (passwordOne !== passwordTwo) {
            console.log("Passwords do not match.");
            sendRequest = false;
        }

        userData.email = email;
        userData.password = passwordOne;

        if (sendRequest) {
            const response = await userRegister(userData);
            const { error } = response
            
            
            // If an error was caught it was packaged and sent back in response.error
            // If not, then there will be an email for the user. response.user.email
            if (!error) {
                // show modal success
                alert(`Account created for ${response.user.email}`)
            }
            else {
               if (error === "user exists") {
                   // show modal
                   alert("User exists")
               } else if (error === 'server closed') {
                   // show modal
                   alert("Server Closed")
               } else {
                   alert(`Unkown: ${error}`)
               }
            }
            console.log("response:", `${JSON.stringify(response)}`);
        }               
    };

    return (
        <Box className="box" style={{ border: "0px solid black", paddingTop: "20px" }}>
            <Paper elevation={8} className="container">
                <form className="registration-form" onSubmit={handleSubmit}>
                    <h1>Life Package</h1>
                    
                        <label htmlFor="email">Email *</label>
                        <input
                            type="text"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    
                        <label htmlFor="fullname">Full Name (Optional)</label>
                        <input
                            type="text"
                            id="fullname"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />

                        <label htmlFor="password">Password *</label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={passwordOne}
                            onChange={(e) => setPasswordOne(e.target.value)}
                        />
                        
                        <label htmlFor="repeat-password">Repeat Password *</label>
                        <input
                            type="password"
                            id="repeat-password"
                            required
                            value={passwordTwo}
                            onChange={(e) => setPasswordTwo(e.target.value)}
                        />
                        
                    <button type="submit">Register</button>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterUser;
