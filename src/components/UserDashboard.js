import Box from "./elements/Box.js";
import  { useState, useEffect } from 'react';



const UserDashboard = () => {
    useEffect(() => {
        document.title = "User Workstation: LifePackage 2024";
      }, []);

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
