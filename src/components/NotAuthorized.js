import Box from "./elements/Box.js";
import TextBox from "./elements/TextBox.js";
import Logo from "./Logo.js";
import Links from "./Links.js";
import Footer from "./elements/Footer.js";
import React , {useEffect, useState} from 'react';

const linkData = {
    textOne: "Support",
    pathOne: "/support",
    textTwo: "Inquiry",
    pathTwo: "/user-feedback"
  };

const styles = {
    main_container: {
        height: 300,
        width: 375,
    },
};

// Hey dont feel bad, I cant get into most places either.

function NotAuthorized() {
    
    useEffect(() => {
        document.title = "Not Authorized: LifePackage 2024";
      }, []);
          
    return (
            <div id="background">
                <Logo marginTop={50} marginBottom={50} />

                <Box id="main-container" borderColor="transparent"
                    style={styles.main_container}
                >
                   <div style={{height:"90%", paddingTop: 40,fontSize: 34, textAlign: "center"}}>
                       You don't have enough privileges to access this route.
                   </div> 
                   <div style={{border:"0px solid white"}}>
                       <Links linkData={linkData} />
                   </div>
                </Box>

                <Footer marginTop={50} />
            </div>
    );
};


export default NotAuthorized;