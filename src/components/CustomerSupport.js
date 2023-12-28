import Box from "./elements/Box.js";
import Logo from "./Logo.js";
import Links from "./Links.js";


const CustomerSupport = () => {
    return (
        
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "50px",
                border: "1px solid gray"
            }}
        >
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                <Logo marginBottom={0} />
                <div style={{marginBottom: 30}}>
                  <h1>Customer Support</h1>
                </div>
                <div style={{textAlign: "center", width: 400}}>
                    This component will be a basic form the user can use to send queries to support.
                    Email, and a textArea to enter the issue. 

                    THis will suffice as a jumping off point.
                </div>
            </Box>


            <Links marginTop={20} linkData={linkData} />
        </Box>
    );
};

export default CustomerSupport;




const linkData = {
    textOne: "Reset Pasword",
    pathOne: "/password-reset",
    textTwo: "Admin Login",
    pathTwo: "/admin-login"
  };