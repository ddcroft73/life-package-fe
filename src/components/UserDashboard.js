import Box from "./elements/Box.js";
import  { useState, useEffect } from 'react';
import Logo from "./Logo.js";
import { BASE_URL } from "../api/settings.js";
import "./userDashboard.css";
import axios from 'axios';


const UserDashboard = () => {
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userData, setUserData] = useState('');

    useEffect(() => {
        async function getUserData() {

            //get the email address
            const user = JSON.parse(localStorage.getItem("LifePackage"));        
            if (user) {
                setEmail(user.username);
                setUserRole(user.user_role)
            }

            const endpoint = `${BASE_URL}/users/me`
            const headers = {
                'Authorization': `Bearer ${user.access_token}`,
                'Content-Type': 'application/json'
            };
            // Get this users data by their email, and loop through it and drop it on the 
            // page in a div for each line. 
            /// /users/me

            try{
               //let response = {};
               //response.status = 200;

                const response = await axios.get(endpoint, {headers: headers});
                if (response.status === 200) {
                    const formattedJson = JSON.stringify(response.data, null, 2);
                    setUserData(formattedJson);
                }
               
            } catch(error) {
                if (error.response) {
                    console.error('Error status:', error.response.status);     
                    console.error('Error detail:', error.response.data.detail);      
                          
                    if (error.response.status >= 400) {
                        alert(error.response.data.detail)
                    }
            }
          }
        };
        document.title = "User Workstation: LifePackage 2024";          
        getUserData();

    }, []);

      // I can go ahead and work on making this componsnt personalized for each user much in the way as it will
      // be
    return (
        <Box id="main-container"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: "auto",
                border: "0px solid gray"
            }}
        >
            <Logo marginTop={50} marginBottom={50}/>

            <Box id="user-data" caption={'User Information:'} labelBgColor={"rgb(10,10,10)"}
                style={{width: 650, height: "auto", marginBottom: 70}}
            >
                <Box style={{display: "flex", flexDirection: "column", gap:20, fontSize: 14, border:"0px solid gray"}}>
                    <div>
                       Username:  <span style={{color:"orange"}}>{email}</span>
                    </div>
                    <div>
                       User Role:  <span style={{color:"orange"}}>{userRole}</span>
                    </div>

                    <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                       {userData}
                    </div>

                </Box>
            </Box>
        </Box>
    );
};

export default UserDashboard;
