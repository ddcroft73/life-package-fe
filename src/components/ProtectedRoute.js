// ProtectedRoute.js

// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../api/utils';

const isAuthenticated = () => {

  
  /**
   *    isAuthenticated. 
   *       A user is authenticated if there is a token in localstorage that 
   *        A. Has su priviliges
   *        B. Is not expired. 
   * 
   *       Since we can't be sure if the current user is the owner of a token residing in localStorage
   *       then we'll just have to assume/hope the token in localStorage is for the user using the system. 
   *       Remember Me may also reflect a diferent user than the one currnently "logged in".
   * 
   *    ALl we are looking for that is protected is the possesion of the access_token with su
   *    privileges
   *    
   *    What if the user in LST is just a reggae user?? 
   *    This should answer all these.
   */
    
    const currentUser = JSON.parse(localStorage.getItem('LifePackage')) || null;    
    if ( currentUser ) {
        if (currentUser.user_role === 'admin'){            
            return !isTokenExpired(currentUser.access_token);
        }
        else if (currentUser.user_role === 'user') {
            return 'user';
        }
    }   
    return false;
};

const ProtectedRoute = ({ children }) => {

  const authenticated = isAuthenticated();

  if (!authenticated) {
    // Redirect them to the /login page, but save the current location they were trying to go to 
    return <Navigate to="/login" replace />;
  }
  else if (authenticated === 'user') {
    return <Navigate to="/nope" replace />; 
  }

  return children;
};

export default ProtectedRoute;
