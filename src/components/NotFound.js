import Box from "./elements/Box.js";
import TextBox from "./elements/TextBox.js";
import Logo from "./Logo.js";
import Links from "./Links.js";
import Footer from "./elements/Footer.js";
import React , {useEffect, useState} from 'react';
import { useNavigate, Link, useLocation} from "react-router-dom";


const linkData = {
    textOne: "Support",
    pathOne: "/support",
    textTwo: "Inquiry",
    pathTwo: "/user-feedback"
  };

const styles = {
    main_container: {
        display: "flex", flexDirection: "column",
        height: 300,
        width: 375,
        border: "0px solid white"
    },
};

// Not Found: 

function NotFound() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        document.title = "Content Does Not Exist:     LifePackage 2024";

        const user = JSON.parse(localStorage.getItem("LifePackage"));
        if (user) setEmail(user.username);
        
        // depending on user role send this user back.
        if (user.user_role === "admin") {
           // navigate("/admin-dashboard");
        }   
        else {
           // For now just load the Usr Dashboard placehoder, but later I need to load the dash for the actual user  users dashboard
           //navigate("/user-dashboard");
        }

      }, []);
          
    return (
            <div id="background">
                <Logo marginTop={50} marginBottom={50} />

                <Box id="main-container" borderColor="transparent"
                    style={styles.main_container}
                >
                    <div style={{fontSize: 85, textAlign: "center"}}>404</div>

                   <div style={{height:"90%", paddingTop: 20,fontSize: 34, textAlign: "center"}}>

                      {} {/** Here, why is it not accessible? */}
                      The content you are looking for doesn't exist.
                   </div> 
                   <div style={{border:"0px solid white"}}>
                      
                   </div>
                </Box>

                <Footer marginTop={90} />
            </div>
    );
};


export default NotFound;

// <Links linkData={linkData} />