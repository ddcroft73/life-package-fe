import { getCurrentDateTime } from './utils';
import axios from 'axios';

const baseUrl = 'http://localhost:8015/api/v1/';



export const userLogin = async (username, password) => {

    const handleFailedLogin = (failedAttempts, username) => {
        const lockAccount = (username) => {
            // send a request to the Auth API to lock the account of username.
            // If such an account exists.
        }; 

        if (failedAttempts == 2) {
            alert(
                "You only have 6 tries to access your account. If you break this, You will have to contact support to get into the account."
            );
        }
        if (failedAttempts == 5) {
            alert(
                "You only get one moretry. hy don;t you reset yopur pasword instead?"
            );
        }
        if (failedAttempts == 6) {
            // Write th results and set user to locked_out = True
            alert(
                "this account has been locked out. Contact (Contact info here) to open the account."
            );
            lockAccount(username);
        }
        const login_data = {
            login_attempts: failedAttempts,
            username: username,
        };

        localStorage.setItem("login_attempts", JSON.stringify(login_data));
    };
    

    const url = `${baseUrl}auth/login/access-token`;
    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    let userData = {};
    userData = JSON.parse(localStorage.getItem('login_attempts') || "{}");
    
    let login_attempts = userData.login_attempts;
    if (login_attempts === undefined || login_attempts === null) {
       login_attempts = 0;
    }

    try {
        const response = await axios.post(url, formData);        
        const { access_token, token_type, code, token, user_role} = response.data;
                
        if (code) {                                           // User has 2FA enabled        
           let data = {
               code: code,
               token: token,
               action: "use2FA"
           };
           localStorage.setItem("TwoFactorAuth", JSON.stringify(data));
            //reset login_attempts
           localStorage.removeItem('login_attempts');
           return data;

        } else if (access_token && token_type === "bearer") { // user got in, no 2FA
            console.log('Success');
            //reset login_attempts
            localStorage.removeItem('login_attempts');

            let access_data = {
                username: username,
                access_token: access_token,
                token_type: "bearer",
                user_role: user_role
            };

            localStorage.setItem("LifePackage", JSON.stringify(access_data));
            return access_data.user_role;

        } 
    // Invalid input, inactive user etc
    } catch (error) {          

        if (error.response) {
            console.error('Error status:', error.response.status);
            if (error.response.status === 400) {
               
               if (error.response.data.detail === 'wrong credintials') {
                  login_attempts++;
                  //handleFailedLogin(login_attempts, username);
                  return "wrong credintials"; 

               } else if (error.response.data.detail === 'inactive user'){
                  return "inactive user";

               } else if (error.response.data.detail === 'locked out'){
                  return "locked out";
               }                
            }
        }
    }    
};


export const userRegister = async (userData) => {

    const url = `${baseUrl}users/registration`;
    
    const payload = {
        "user_in": {
            "email": userData.email,
            "password": userData.password,
            "full_name": userData.fullName || null
        },
        "account_in": {
             "creation_date": getCurrentDateTime()
        }
    };

    try {
        const response = await axios.post(url, payload);  
        
        if (response.status === 200) {
            console.log('Success!');

            // Handle your data here
            console.log(response.data);
            return response.data
        } 
        
    } catch (error) {
        if (error.response) {
            console.error('Error status:', error.response.status);
            if (error.response.status === 400) {
                return error.response.data.detail;
            }

        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response:', error.request);
            return error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            return error.message;
        }
    }
};


export const verifyTwoFactorCode = async () => {

};