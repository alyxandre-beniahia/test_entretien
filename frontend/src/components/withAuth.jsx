import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const token = localStorage.getItem('token');

    if (!token) {
      // If there is no token, redirect to the login page
      return <Navigate to="/login" replace />;
    }

    // If there is a token, render the component
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;