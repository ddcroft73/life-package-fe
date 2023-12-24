import React from 'react';
import { userRegister } from '../api/api.js';
import { isEmailAddress } from '../api/utils.js';
import { useState, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from "../components/elements/Box.js";
import Paper from "../components/elements/Paper.js";
import TextBox from "../components/elements/TextBox.js";
import Button from "../components/elements/Button.js";
import Space from "../components/Space.js";
import Footer from './elements/Footer.js';
import Links from './Links.js';
import Modal from './Modal';
import Logo from './Logo.js';

/**
 *  UserRegistration Component
 *    THe first component i did not generate. Almost all my componsnts for this application are built a birt different.
 *    Some have css files, some have inline style, some have the inline style defined in objects that are separate from
 *    the JSX, style={} and others are defined directly inside the JSX styles={{}}. I have changed what I thought was the
 *    most readable way several times and i think I am going with the design of this component. 
 * 
 *    1. One main function that is the component, conventional function declaration.
 *    2. All state in that function
 *    3. All handlers nested at the top, => arrow functions.
 *    4. useEffect next for applying code as in media queries. (I cant get it to work wit css files.)
 *    5. All other helper functions => arrow functions nested as well.
 *    6. Styles object defines at bottom to style the component
 * 
 * @returns null
 */


function UserRegistration() {
    const [email, setEmail] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [namesContainerStyle, setNamesContainerStyle] = useState({});

    const [message, setMessage] = useState('');
    const [modalConfig, setModalConfig] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigate = useNavigate();
    let sendRequest = false;

    // HANDLERS
    const handleEmail = (value) => {
        setEmail(value);
    };
    const handlePasswordOne = (value) => {
        setPasswordOne(value);
    };
    const handlePasswordTwo = (value) => {
        setPasswordTwo(value);
    };
    const handleFirstName = (value) => {
        setFirstName(value);
    }; 
    const handleLastName = (value) => {
        setLastName(value);
    };


    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 600) {
                setNamesContainerStyle({
                    flexDirection: 'column',
                });
            } else {
                setNamesContainerStyle({
                    flexDirection: 'row',
                });
            }
        }    

        document.title = "User Registration: LifePackage 2023";

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);

    }, []);
    

    // MODAL FUNCTIONS
    const confirmAction = () =>  navigate('/verify-email', { state: { email: email } }); 
    const cancelAction = () => setIsModalVisible(false);
     
    const showMessageModal = (content) => {
        setModalConfig({
        content,
        buttons: [
            { text: 'OK', handler: cancelAction }
        ]
        });
        setIsModalVisible(true);
    };

    // Function to program modal for an action on OK
    const showConfirmModal = (content) => {
        setModalConfig({
        content,
        buttons: [
            { text: 'OK', handler: confirmAction },
            //{ text: 'Cancel', handler: cancelAction }
        ]
        });
        setIsModalVisible(true);
    };
    
    const registerUser = () => {
        console.log(`User Information: \nEmail: ${email}, PasswordOne: ${passwordOne} PasswordTwo: ${passwordTwo} \nFull Name: ${firstName} ${lastName}` )
    };


    return (
          <div id='background'>

            <Modal
                show={isModalVisible}
                content={modalConfig.content}
                buttons={modalConfig.buttons}
            />

            <Logo marginTop={50} />

            <Box id="component-container"
                style={styles.comp_container}
            >
                <div id="top-strip"
                    style={styles.top_strip}
                >                
                </div>   
                <Box id="inner-container"
                    style={styles.inner_container}
                >
                    <Box style={styles.text_content}>

                        <h2>Register A New Account</h2>
                        <div id="sub-content" 
                            style={styles.sub_content}
                        >
                            Enter the required information below to create an account. If you would prefer you can also use your Facebook or Google account to 
                            gain access through them. 
                        </div>
                    </Box>
                    <Box id="creds-container" caption={"Required Fields"} color={'white'}
                        style={styles.creds_container}
                    >
                        <TextBox  id="email" label="Email *" type="text" width="100%" containerPadding={0} onChange={handleEmail} />
                        <TextBox  id="password1" label="Password *"  type="password" width="100%" containerPadding={0} onChange={handlePasswordOne} />
                        <TextBox  id="password2" label="Retype-Password *"  type="password" width="100%" containerPadding={0} onChange={handlePasswordTwo} />        
                    </Box>      
                    <Box id="names-container" caption={"Optional Fields"}  color={'white'}
                        style={{
                            ...styles.names_container,
                            ...namesContainerStyle 
                        }}
                    >
                        <TextBox  id="first-name" label="First Name" type="text" width="100%" containerPadding={0} onChange={handleFirstName} />
                        <TextBox  id="last-name" label="Last Name"  type="text" width="100%" containerPadding={0} onChange={handleLastName} />                    
                    </Box>      

                    <Button id="register-button" onClick={registerUser}
                        style={styles.button}
                    >
                        Register                    
                    </Button>       

                   <Links linkData={linkData}/>       

                </Box> 
                

                <Box id="oAuth"
                  style={{border: "0px solid gray", 
                    width: "100%", display: "flex", justifyContent: 'center', 
                    alignItems: 'center', height: 100, marginBottom: 8, marginTop: 18
                  }}
                >
                    <Box style={{display: 'flex', border: "0px solid black", padding: 0,}}>
                        <div className="oauth" style={styles.oAuth}><i className="fa-brands fa-facebook-f" /></div>
                        <div className="oauth" style={styles.oAuth}><i className="fa-brands fa-google" /></div>              
                    </Box>
                                
                </Box>
                <Footer marginTop={5} marginBottom={20}/>
            </Box>

          </div>
    );
};

const linkData = {
    textOne: "Login",
    pathOne: "/login",
    textTwo: "FAQ",
    pathTwo: "/two-factor-auth"
};

const styles = {
    "oAuth": {
        fontSize: 26,
        border: '0px solid gray',
        padding: 5
    },
    comp_container: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 575,
        minWidth: 375,
        marginTop: 10,
        //height: "auto",
        backgroundColor: "transparent",//"rgb(12,12,12)",
        color: "gray",
        width: "100%",
        height: "auto", 
        padding: 0,
        border: "0px solid black"
    },
    top_strip: {
        width: "100%",
        border: "0px solid gray",
        height: 20,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#817Daa'
    },
    creds_container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
        border: "1px solid gray",
        marginBottom: 10,
        marginTop: 30,
        paddingTop: 15
    }, 
    names_container: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        paddingTop: 15,
        marginTop: 15,
        border: "1px solid gray",
    },
    text_content: {
        textAlign: "center",
        color: "white",
        padding: 0,
        border: "0px solid gray",
    },
    sub_content: {
        color: "gray",
        border: "0px solid gray",
        marginBottom: 15,
        textAlign: "center",
        padding: 12,
    },
    inner_container: {
        width: "100%",
        height: "auto",
        backgroundColor: "rgb(12,12,12)",
        border: "1px solid black",
    },
   
    button: {
        fontSize: 18
    }
};

export default UserRegistration;