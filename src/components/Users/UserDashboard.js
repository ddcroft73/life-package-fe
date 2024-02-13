import Box from "../elements/Box.js";
import  { useState, useEffect } from 'react';
import Logo from "../Logo.js";
import { BASE_URL } from "../../api/settings.js";
import "./userDashboard.css";
import axios from 'axios';
import Layout from "./Layout.js";

const styles = {

};

//IDEAS:

// Take inspiration from MUI Dashboard if going that way. Emulate the sinking toolbar, and the offset Icon theme.
// Use Replit.com ideas. I like the "Tabbed" UI.. something there. Definitly like the menu "cards" and the 
// tooltips. 


// These will be kept in their own little encapsulated files.. ofcourse, As soon as I figure out the look and all.
function Navbar() {
    return (
      <Box style={{display: "flex", width: "100%", height: 120, border: "1px solid gray", alignItems: "left"}}>
         <Logo/>
      </Box>
    );
};


function DeadSpace({ display="flex"}) {
    return (
      <Box style={{display: display, width: "240px", height: "100%", border: "0px solid gray"}}>
        Dead SPace
      </Box>
    );
};

function Footer() {
    return (
      <Box style={{width: "100%", height: 80, border: "1px solid gray"}}>
        Copyright, legal shizz

      </Box>
    );
};



const UserDashboard = () => {
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userData, setUserData] = useState('');    
    const [deadSpaceDisplay, setDeadSpaceDisplay] = useState("none");


    function Main() {
        const mainWidth = deadSpaceDisplay === "none" ? "100%" : "calc(100vw - 480px)";

        return (
          <Box style={{width: mainWidth, height: "calc(100vh - 200px)", border: "1px solid gray", overflowX: "auto", overflowY: "auto"}}>

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
                <Box id="user-data" caption={'User Information:'} labelBgColor={"rgb(10,10,10)"}
                    style={{width: "auto", height: "auto", marginBottom: 70, border:"1px solid gray",}}
                >
                    <Box style={{display: "flex", flexDirection: "column", gap:20, fontSize: 14, border:"0px solid gray"}}>
                        <div>
                           Username\email:&nbsp; &nbsp; [ <span style={{color:"orange"}}>{email}</span>  ]
                        </div>
                        <div>
                           User role: &nbsp;&nbsp;[ <span style={{color:"orange"}}>{userRole}</span> ]
                        </div>
                        
                        <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                           Raw data: <br/> <br/>
                           {userData}
                        </div>
    
                    </Box>
                </Box>

            </Box>
          </Box>
        );
    };

    useEffect(() => {
      
         function handleResize() {
            if (window.innerWidth < 1100) {
              setDeadSpaceDisplay( "none");

            } else {
              setDeadSpaceDisplay( "flex");
            }
        }    
     
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
        window.addEventListener('resize', handleResize);           
        getUserData();
        handleResize();
              
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    
      return (
        <Layout 
            footer={<Footer />}
            navbar={<Navbar />}
            deadspace={<DeadSpace display={deadSpaceDisplay} />}
        >    
        {<Main />}
        </Layout>
      );
};

export default UserDashboard;






/**
 *  
 */