import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, roleRequired }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ❌ Role mismatch
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/music" />;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoutes;