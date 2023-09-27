
import axios from 'axios';

const baseUrl = 'http://localhost:8015/api/v1/';

export async function userLogin(username, password) {
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
        const { access_token, token_type, user_role } = response.data;
        //let access_token, token_type, user_role;

        if (access_token && token_type === "bearer") {
            // login successful. Save the token to be used until it expires.
            console.log('Success');

            //reset login_attempts
            localStorage.removeItem('login_attempts');
            // save the token for API access
            let access_data = {
                username: username,
                access_token: access_token,
                token_type: "bearer",
                user_role: user_role
            };
            localStorage.setItem("LifePackage", JSON.stringify(access_data));
            return access_data.user_role;

        } else {        
             throw new Error("Incorrect username or password.");                     
        }
    } catch (error) {
        login_attempts++;
        handleFailedLogin(login_attempts, username);

        console.error("There was a problem with the login request:", error.message);
        return false;   
      
    }
};

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


