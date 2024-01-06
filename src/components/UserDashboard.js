import Box from "./elements/Box.js";
import  { useState, useEffect } from 'react';



const UserDashboard = () => {
    useEffect(() => {
        document.title = "User Workstation: LifePackage 2024";
      }, []);

      // I can go ahead and work on making this componsnt personalized for each user much in the way as it will
      // be
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px"
            }}
        >
            <Box>
                <h1>User Dashboard</h1>
            </Box>
        </Box>
    );
};

export default UserDashboard;
