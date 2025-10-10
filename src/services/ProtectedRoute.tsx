import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
  const isAuthenticated = Boolean(storedUser?.id);

  if (!isAuthenticated) {
    if (location.pathname !== "/login") {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
  if (isAuthenticated) {
    if (location.pathname !== "/account") {
      return <Navigate to="/account" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
