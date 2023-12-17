import Box from "./elements/Box.js";
import React, { useState, useEffect  } from 'react';
import { useNavigate , useLocation}  from 'react-router-dom';
import Button from "./elements/Button.js"
import Paper from "./elements/Paper.js"
import axios from 'axios';
import { BASE_URL, SERVER_HOST } from "../api/settings.js";
import { decodeJwt } from "../api/utils.js";


const TwoFactorAuth = ({ onSubmit }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [cnt, setCnt] = useState(2);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeOut2, setFadeOut2] = useState(false);
  
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();  
  
  useEffect(() => {
    document.title = "Two Factor Authentication: LifePackage 2023";
  }, []);

  const handleChange = (index) => (e) => {
      const value = e.target.value;
      const newCode = [...code];
      
      if (value.match(/[0-9a-zA-Z]/)) {
          newCode[index] = value.toUpperCase(); 
          setCode(newCode);
      
          // Auto-focus the next input after a digit or letter is typed
          if (e.target.nextSibling) {
              e.target.nextSibling.focus();
          }
      }
  };

  const handleKeyDown = (index) => (e) => {
      // Allow backspace to clear the current input and then move to the previous input
      if (e.key === 'Backspace') {
          e.preventDefault();
      
          const newCode = [...code];
          // If there is a value in the current input, clear it
          if (code[index]) {
            newCode[index] = '';
            setCode(newCode);
          }
          // If the current input is already empty, delete the previous input's value
          else if (index > 0 && !code[index]) {
            newCode[index - 1] = '';
            setCode(newCode);
            // Move focus to the previous input
            const prevInput = e.target.previousSibling;
            if (prevInput) {
              prevInput.focus();
            }
          }
        }
    };

  const resend2FA = async () => {
    const url = `${BASE_URL}/auth/2FA/resend-2FA-code`;
    const resendLink = `${url}?email=${email}`    
    
    try {
        // send request to resend endpoint
        //let response={};
        //response.status = 200;
        const response = await axios.put(resendLink);            

        if (response.status === 200) {
            setCnt(cnt+1);

            if (cnt < 4) {
                setMessage(`${cnt} codes dispatched to: ${email}...`);   
            } else {
                setMessage("Three's the limit... redirecting to login.")
                setFadeOut(true);
                setTimeout(() => navigate("/login"), 3000);
            }                
        }
    }
    catch (error) {
        if (error.response) {
            console.error('Error status:', error.response.status);

            if (error.response.status >= 400) {  // 401, 404, 403, 409, etc                
              setFadeOut2(true);
              setMessage(error.response.data.detail)
              setTimeout(() => {
                setMessage("")
                 setFadeOut2(false);
              }, 3900);               
            } 
        } 
     }
  };
  
  
  const verify2faCode = async (e) => {
    e.preventDefault();

    // /auth/2FA/verify-2FA-code/
    let userData = JSON.parse(localStorage.getItem('TwoFactorAuth') || "{}");
    let code_2FA = userData.code;
    const token = userData.token; 
    const email = decodeJwt(token).email;
    const userRole = userData.user_role;
    
    const users_code = code.join('');


    if (code_2FA && token && users_code.length === 6) {
        const url = `${BASE_URL}/auth/2FA/verify-2FA-code/`;            
        const payload = {
          "code_2FA": code_2FA,
          "code_user": users_code,
          "email_account": email,
          "timed_token": token
        };

        try {
              const response = await axios.put(url, payload)
              const { access_token, token_type, user_role } = response.data;

              if (response.status === 200) {
                  console.log('Success!');
                 if (access_token && token_type === "bearer") { 
                    console.log('Success');
        
                    let access_data = {
                        username: email,
                        access_token: access_token,
                        token_type: "bearer",
                        user_role: user_role
                    };      
                    localStorage.setItem("LifePackage", JSON.stringify(access_data));

                    // navigate accordingly.                    
                    if (user_role === "admin") {
                       // load the admin PIN// user workstation
                       setFadeOut(true);
                       setTimeout(() => {
                          navigate("/admin-login")
                          setFadeOut(false);
                      }, 3000);    

                    } else if (user_role === "user") {
                       // user workstation
                       setFadeOut(true);
                       setTimeout(() => {
                          navigate("/user-dashboard")
                          setFadeOut(false);
                      }, 3000);    

                    }                    
                 } 
              }   
              
        // Error due to server response
        } catch(error) {
            // 
            if (error.response) {
              console.error('Error status:', error.response.status);
  // Ill fix this later. 
              if (error.response.status >= 400) {  // 401, 404, 403, 409, etc
                
                setFadeOut2(true);
                setMessage(error.response.data.detail)
                setTimeout(() => {
                  setMessage("")
                   setFadeOut2(false);
               }, 3900);    

       //         setMessage(error.response.data.detail);
       //         setTimeout(() => setMessage(""), 3000);               
              }
          } 
        }

    // Error user input, data from localStorage
    } else if (users_code.length != 6) {
          setFadeOut2(true);
          setMessage('Missing 1 or more characters input.')
          setTimeout(() => {
            setMessage("")
            setFadeOut2(false);
        }, 3900);   

    //    setMessage('Missing 1 or more characters input.')
    //    setTimeout(() => setMessage(""), 3000);

    } else if (!code_2FA || !token) {
          setFadeOut2(true);
          setMessage("Error: Click below to resend 2FA code.")
          setTimeout(() => {
            setMessage("")
            setFadeOut2(false);
        }, 3900);  

    //    setMessage("Error: Click below to resend 2FA code.")
    //    setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
       <div className={fadeOut ? 'fade-out' : ''}>
          <Box style={styles.container}>
            <Box style={styles.formBox}>
              <div style={styles.lockIcon}>🔒</div>
              <h1 style={styles.title}>Life Package</h1>
              <Box style={styles.subtitle}>Enter the 6-digit code You received via email or sms.</Box>

              <div className={fadeOut2 ? 'fade-out' : ''}>
                <Box style={{border: "0px solid black", height: 22}}>
                  {message && (
                  <Box style={{position: "relative", top: -8, border: "0px solid black", fontSize: 14, zIndex: 10, padding: 0, color: "orange", textAlign: "center"}} className="error-message">
                      {message}
                  </Box>
                  )}
                </Box >  
              </div> 

              <form onSubmit={verify2faCode}>
                    <Box style={styles.inputsContainer}>
                      {code.map((digitOrLetter, index) => (
                          <input
                          onKeyDown={handleKeyDown(index)}
                          key={index}
                          style={styles.input}
                          type="text"
                          maxLength="1"
                          value={digitOrLetter}
                          onChange={handleChange(index)}
                          pattern="[0-9a-zA-Z]"   // This pattern allows digits and letters
                          autoFocus={index === 0} // Focus the first input on mount
                          />
                      ))}
                    </Box>

                    <Box style={{lineHeight: 1.2, border: "0px solid gray", color: "gray", textAlign: "left"}}>
                    If you don't receive the code within a few minutes, please check your spam folder
                    or <span style={{cursor: "pointer",padding:3, color: 'orange'}} onClick={resend2FA}>click here</span> to resend.
                    </Box>
                  <Button type="submit" style={styles.button}>Submit</Button>
              </form>
            </Box>
          </Box>
      </div>    
  );
};



// Inline styles
const styles = {
  container: {
    display: 'flex', 
    border: "0px solid gray",
    borderRadius: '15px', 
    marginTop: 20,
    justifyContent: 'center', 
    width: 375,
    alignItems: 'center', 
    height: 'auto', 
    backgroundColor: "transparent",//'rgb(49, 46, 44)',
    fontFamily:  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;"
  },
  hyphen: {
    fontSize: '28px',
    alignSelf: 'center',
    color: 'white', // Set the color to match your design
    padding: '2px 5px', // Adjust spacing to align with your design
  },
  formBox: {
    backgroundColor: 'rgb(49, 46, 44)', 
    border: "1px solid gray",
    borderRadius: '15px', 
    textAlign: 'center',
   /* padding: '40px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',*/
    maxWidth: '370px',
    width: '100%',
    height: 'auto'
  },
  lockIcon: {
    fontSize: '32px',
    color: '#ffba00', // Color of the lock icon, adjust as needed
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '24px'
  },
  subtitle: {
    color: 'white',
    marginTop: 0,
    marginBottom: '0px',
    border: '0px solid white', 
    textAlign: "left",
  },
  inputsContainer: {
    display: 'flex', 
    justifyContent: 'center',
    marginBottom: '0px',
    marginTop: '0px',
    paddingTop: "10px",
    border: '0px solid white', 
  },
  input: {
    width: '40px', 
    height: '50px', 
    margin: '0 5px', 
    fontSize: '32px', 
    textAlign: 'center',
    borderRadius: '6px', 
    border: '1px solid gray', // Adjust as needed
    backgroundColor: 'rgb(33, 33, 33)',
    color: 'white'
  },
  button: {
    padding: '15px', 
    backgroundColor: '#484444', // Placeholder color, replace with the color you want
    color: 'white', 
    border: '1px solid white', 
    //borderRadius: '8px', 
    cursor: 'pointer',
    fontSize: '20px',
    width: '95%', // Full-width button
    marginBottom: 10
  }
};

export default TwoFactorAuth;
