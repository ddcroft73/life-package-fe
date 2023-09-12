

// I need a function to send the username, and password to my api to login and
// get a token. When the token cometh back, save it in localStorage. Ok... Im not  Keen on
// just stuffing it in LS. I need to think of a better way to handle this. Probably still with LS,
// but a bit more creative with the token string.

import axios from 'axios';

const baseUrl = 'http://localhost:8015/api/v1/';

export async function userLogin(username, password) {
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
        const { access_token, token_type, user_role } = response.data;
        //let access_token, token_type, user_role;

        if (access_token && token_type === "bearer") {
            // login successful. Save the token to be used until it expires.
            console.log('Success');

            //reset login_attempts
            localStorage.removeItem('login_attempts');
            // save the token for API access
            let access_data = {
                access_token: access_token,
                token_type: "bearer",
                user_role: user_role
            };
            localStorage.setItem(username, JSON.stringify(access_data));
            return true;

        } else {          
            login_attempts++;
            handleFailedLogin(login_attempts, username);
            return false;            
        }
    } catch (error) {
        console.error("There was a problem with the login request:", error);
    }
};

const handleFailedLogin = (failedAttempts, username) => {
    const lockAccount = (username) => {
        // send a request to the Auth API to lock the account of username.
        // If such an account exists.
    };
    if (failedAttempts == 2) {
        alert("You only have 6 tries to access your account. If you break this, You will have to contact support to get into the account.");
    }    
    if (failedAttempts == 5) {
        alert("You only get one moretry. hy don;t you reset yopur pasword instead?")
    }
    if (failedAttempts == 6) {
        // Write th results and set user to locked_out = True
        alert("this account has been locked out. Contact (Contact info here) to open the account.")
        lockAccount(username)
    }
    const login_data = {
        'login_attempts': failedAttempts,
        'username': username,
    };

    localStorage.setItem('login_attempts', JSON.stringify(login_data));
};
