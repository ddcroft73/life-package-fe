import { BASE_URL } from "./settings";
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export function decodeJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    return JSON.parse(jsonPayload);
};


export const isTokenExpired = (token) => {
    
    const isExpired_ = (expTimestamp) => {
        const currentTime = Math.floor(Date.now() / 1000); 
        return expTimestamp <= currentTime;
    }
    const decodedPayload = decodeJwt(token);
    const { exp } = decodedPayload;        
    return isExpired_(exp); 
};

export function convertUnixTo24Hour(timestamp) {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleTimeString('en-US', { hour12: false });
};

export function getEmail(token) {
    const payload = decodeJwt(token);
    try {
        return payload["email"];
    }
    catch(error) {
        return "no email property";
    }
};


export function getCurrentDateTime() {
    const now = new Date();

    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};


export const isEmailAddress = (emailString) => {
    if (emailString.includes('@') && emailString.includes('.')) {
      return true;
    }
    return false;
};

export function verifyPasswordStrength(password) {
    const minLength = 8;
    let failureMessages = [];

    if (password.length < minLength) {
        failureMessages.push("Length must be 8 or more characters");
    }
    if (!/[A-Z]/.test(password)) {
        failureMessages.push("Needs at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
        failureMessages.push("\nNeeds at least one lowercase letter.");
    }
    if (!/\d/.test(password)) {
        failureMessages.push("Needs at least one digit.");
    }
    if (!/[!@#$%^&*]/.test(password)) {
        failureMessages.push("Needs at least one special character.");
    }
    if (failureMessages.length === 0) {
        return true;
    }
    return failureMessages;
};

// Adds hyphens to the number as the user types
export const formatPhoneNumber = (input) => {
    // Remove all non-digits and already placed hyphens
    let numbers = input.replace(/[^\d]/g, '');        
    // Slice and add hyphens
    if (numbers.length > 3 && numbers.length <= 6) {
      numbers = numbers.slice(0, 3) + '-' + numbers.slice(3);
    } else if (numbers.length > 6) {
      numbers = numbers.slice(0, 3) + '-' + numbers.slice(3, 6) + '-' + numbers.slice(6, 10);
    }
    
    return numbers;
  };

// removes anythng not a digit before saving to the server
export function sanitizePhoneNumber(phoneNumber) {
    const isNumeric = str => /^\d+$/.test(str);

    let result = "";

    for (let item of phoneNumber.split("")) {
        if (isNumeric(item)) {
            result = result + item;
        } 
    }    
    return result
};

export async function  populateUsersTable() {
    // 1 Makes a request to the server for a list of all the users.
    // 2 iterates over the list and extracts the necessary info needed to displayfor each user. 
    // 3 Packages it all in a JS object to be used by the AdminDashboard Component.
    // returns the object
    
    async function getUsers() {
        // Make the request and return the response
        const endPoint = `${BASE_URL}/users`;
        
        const adminData = JSON.parse(localStorage.getItem("LifePackage"));
        const accessToken = adminData ? adminData.access_token : null;
        
        if (accessToken) {
            // rock and roll
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };
            
            try {                                      // {}
                const response = await axios.get(endPoint, {headers: headers});  // Dont need {} as second arg with GET.
                
                if (response.status === 200) {
                   return response.data;
                }
            // no need to display the erors on the FE, the console is good enough for the admin. ME,     
            } catch(error) {       
                if (error.response) {
                    console.error('Error status:', error.response.status);                   
                } 
            }
        }else {
            <Navigate to="/login" />;
        }        
    };    

    function buildUsersObj(usersData) {
        // The basic object set up with the headers in tact. 
        // Create the data array using the user info gathered fron the server.
        const tableData = {
            headers: [
                'Table ID',
                'DB Assigned ID:',
                'Email:',
                'Full Name:',
                'Phone Number:',
                'Account Type:',
                'Two Factor Auth:',
                'Account Status:',    // logged in, not inactive. locked,
                'Notes:',
            ],            
            data: [],
        };

        let data = [];

        usersData.forEach((item, index) => {
          let obj = {
             id: index,
             user_id: item.account.user_id,
             email: item.user.email,
             name: item.user.full_name,
             phone: item.user.phone_number,
             tier: item.account.subscription_type === "super user" ? "Admin": `User Level: ${item.account.subscription_type}`,
             twoFactorAuth: item.account.use_2FA ? "true" : "false",
             accountLocked: item.account.account_locked ? "true" : "false",
             notes: item.account.account_locked_reason
          };

          data.push(obj);
        });

        tableData.data = [...data];             
        return tableData;
    };


    const usersArray = await getUsers();    
    const usersObj = buildUsersObj(usersArray);

    return usersObj;
};
