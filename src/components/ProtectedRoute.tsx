
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific roles are required, or user has one of the required roles
  if (allowedRoles.length === 0 || hasRole(allowedRoles)) {
    return <>{children}</>;
  }

  // If user doesn't have required role, redirect to dashboard
  return <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute;
