
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // If still loading auth state, show nothing (or could show a loading spinner)
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and user doesn't have permission
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to the appropriate dashboard based on role
    switch (user.role) {
      case "student":
        return <Navigate to="/dashboard/student" replace />;
      case "committee-head":
        return <Navigate to="/dashboard/committee" replace />;
      case "internship-cell":
        return <Navigate to="/dashboard/internship" replace />;
      case "exam-cell":
        return <Navigate to="/dashboard/exam-cell" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // If authenticated and has permission (or no specific roles required), render children
  return <>{children}</>;
};

export default ProtectedRoute;
