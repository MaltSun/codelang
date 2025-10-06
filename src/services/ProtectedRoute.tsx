import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  requireAuth?: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAuth = true,
  children,
}) => {
  const location = useLocation();

  const storedUser = sessionStorage.getItem("user");
  let user: any = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const isAuthenticated = user && user.id; 

  if (requireAuth && !isAuthenticated) { return <Navigate to="/login" state={{ from: location }} replace />;
  }
 if (!requireAuth && isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
