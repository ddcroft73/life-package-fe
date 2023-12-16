import Box from "./elements/Box.js";

import { useLocation } from 'react-router-dom';

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

export default PasswordReset;
