// ProtectedRoute.js

// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isTokenExpired } from '../api/utils';

const isAuthenticated = () => {
  // Replace with your authentication logic

  // Basically, This is checking to seeif the token in storage has su privledges...
  // What id the user on this puter does not but the one in storage does???
  // a Problem for later since their will pronbally only be one admin ever., and thats me.

  // This is going to be confusing AF in a few weeks so here goers: 
  //  isTokenExpired returns true if the token is expired, not true if its good.
  //  but isAuthenticated returns true if the user is good. So Some swapping had to take place
  //  to make it all jive.
  try{
    let token = isTokenExpired(JSON.parse(localStorage.getItem('LifePackage')).access_token);  
    return !token

  } catch(error) {
    
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
