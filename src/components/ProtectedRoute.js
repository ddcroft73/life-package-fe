// ProtectedRoute.js

// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../api/utils';

const isAuthenticated = () => {

  // Basically, This is checking to seeif the token in storage has su privledges...
  // What if the current user on this puter does not but the one in storage "Remember me"  does???
  // a Problem for later since their will pronbally only be one admin ever., and thats me.

  // This is going to be confusing AF in a few weeks so here goes: 
  //  isTokenExpired returns true if the token is expired, not true if its not..
  //  but isAuthenticated returns true if the user and token are valid and has the 
  //  correct priveldges. So Some swapping had to take place to make it all jive.

  try{
      // if the user is admin, check to see if the token is still valid. If not admin
      // return false. if admin return true or false depending on the state of the token.
      
      const userRole = JSON.parse(localStorage.getItem('LifePackage')).user_role;
      if (userRole === 'admin') {
          const token = isTokenExpired(JSON.parse(localStorage.getItem('LifePackage')).access_token);  
          return !token
      }      
      else{
        return false;
      }

  } catch {    
     return false;
  }  

};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    // 
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
