// src/components/AuthGuard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  // Access user state from Redux store
  const user = useSelector((state) => state.auth.user);

  // If there is no user, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the children
  return children;
};

export default AuthGuard;
