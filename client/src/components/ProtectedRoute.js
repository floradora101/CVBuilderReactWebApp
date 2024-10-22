import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, error }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ error }} replace />
  );
};

export default ProtectedRoute;
