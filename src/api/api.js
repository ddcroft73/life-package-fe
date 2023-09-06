

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

    try {
        const response = await axios.post(url, formData);
        const { access_token, token_type } = response.data;

        if (access_token && token_type === "bearer") {
            // login successful. Save the token to be used until it expires.
            console.log('Success');
            return 

        } else {
            throw new Error('Unexpected response from server');
        }
    } catch (error) {
        console.error("There was a problem with the login request:", error);
    }
}

//  need to set up a counter to log the number of times a user tries to login.
// this means 

