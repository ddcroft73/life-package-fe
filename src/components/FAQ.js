import Box from "./elements/Box.js";
import Logo from "./Logo.js";
import Links from "./Links.js";
const FAQ = () => {
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
                  <h1>Frequently Asked Questions</h1>
                </div>
                <div style={{textAlign: "center", width: 400}}>
                    It will be a centerd display of questions with corresponding answers.

                    I assume that as I get deeper in the app these will arise.
                </div>
            </Box>

            <Links marginTop={20} linkData={linkData} />
        </Box>
    );
};

export default FAQ;




const linkData = {
    textOne: "Forgot Password?",
    pathOne: "/recover-password",
    textTwo: "Login",
    pathTwo: "/login"
  };