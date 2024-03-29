import { getCurrentDateTime } from './utils';
import axios from 'axios';
import  { BASE_URL }  from "./settings";


//const baseUrl = `http://${SERVER_HOST}/api/v1/`; //'http://localhost:8015/api/v1/';
/** 
 *   It is Highly possible i am about to remove this and just do evrything in the respected 
 *   Component. Unless the app gets complicated I dont see a reason to do twice the work.
*/


export const userLogin = async (username, password) => {    
    /**
     * 
     * @param {* } username 
     * @param {*} password 
     * @returns nothing
     * 
     */
   
    const url = `${BASE_URL}/auth/login/access-token`;
    

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {

        const response = await axios.post(url, formData);
        const { access_token, token_type, user_role, code, token} = response.data;           

        if (code) {                                           // User has 2FA enabled        
            console.log('User has 2FA enabled. Must verify code to get access');

            let data = {
                code: code,
                token: token,
                user_role: user_role,
                action: "use2FA"
            };

            localStorage.setItem("TwoFactorAuth", JSON.stringify(data));
            return data;
    
       } 
        else if (access_token && token_type === "bearer") { // user got in, no 2FA
            console.log('Success');

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
                // This could also mean the user does not exist...
                // Handling in the component  
               }
               // just send any detail back so I know exactly what happened.
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
            "full_name": userData.fullName || null,
            "phone_number": userData.phoneNumber,
        },
        "account_in": {
             "creation_date": getCurrentDateTime(),
             "use_2FA": userData.enable2FA || false
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
            resp.error = "no response"
            return resp//error.request;

        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            resp.error = error.message
            return resp //error.message;
        } 
    } 
};

