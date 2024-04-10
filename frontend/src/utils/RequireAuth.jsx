import React, { useCallback, useEffect } from 'react';
import { useUser } from "../contexts/userContext";
import { Link, Navigate, Outlet } from "react-router-dom";

// This is a higher order component that wraps around a component and checks if the user is authenticated.
// If the user is not authenticated, they are redirected to the login page.
// If the user is authenticated, the wrapped component is rendered.
export default function RequireAuth() {

  const { isAuthenticated } = useUser();

  return (
    <div>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        // Redirect to the login page if the user is not authenticated but pass the outlet as a query parameter
        <div>
          <h1>You are not logged in!</h1>
          <Link to="/login?next=/dashboard">Login</Link>
        </div>
      )}
    </div>
  );
};