import { getCurrentDateTime } from './utils';
import axios from 'axios';
import  {BASE_URL, SERVER_HOST}  from "./settings";


//const baseUrl = `http://${SERVER_HOST}/api/v1/`; //'http://localhost:8015/api/v1/';
/** 
 *   It is Highly possible i am about to remove this and hust do evrything in the respected 
 *   Component. Unless the app gets complicated I dont see a reason to do twice the work.
*/


export const userLogin = async (username, password) => {    
    /**
     * 
     * @param {* } username 
     * @param {*} password 
     * @returns 
     */
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
    

    const url = `${BASE_URL}/auth/login/access-token`;
    

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    let userData = JSON.parse(localStorage.getItem('login_attempts') || "{}");
    
    let login_attempts = userData.login_attempts;
    if (login_attempts === undefined || login_attempts === null) {
       login_attempts = 0;
    }

    try {
        const response = await axios.post(url, formData);
        const { access_token, token_type, user_role, code, token} = response.data;
   

        if (code) {                                           // User has 2FA enabled        
            let data = {
                code: code,
                token: token,
                action: "use2FA"
            };
            localStorage.setItem("TwoFactorAuth", JSON.stringify(data));
            localStorage.removeItem('login_attempts');

            return data;
    
            } 
            else if (access_token && token_type === "bearer") { // user got in, no 2FA
                console.log('Success');
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
                    
        
    // Invalid input, inactive user, wrong password or email
    } catch (error) {          

        if (error.response) {
            console.error('Error status:', error.response.status);
            
           if (error.response.status >= 400) {
               
               if (error.response.data.detail === 'wrong credentials') {
                  login_attempts++;
                  //handleFailedLogin(login_attempts, username);
                }
                // jus tsend any detail back so I know exactly what happened.
                return error.response.data.detail
           }
       }    
    };
};


export const userRegister = async (userData) => {

    const url = `${BASE_URL}/users/registration`;
    
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
            // From here I can pass the info out and load up the users station.
            return response.data // for now return the user and account data as it was created.
        } 
    } catch (error) {

        let resp = {};
        
        if (error.response) {
            console.error('Error status:', error.response.status);

            if (error.response.status >= 400) {  // 401, 404, 403, 409, etc
                resp.error = error.response.data.detail
                return resp //error.response.data.detail;
            }
        } 
        else if (error.request) {
            // The request was made but no response was received
            console.error('No response:', error.request);
            resp.error = error.request
            return resp//error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            resp.error = error.message
            return resp //error.message;
        }
    }
};


export const verifyTwoFactorCode = async () => {

};