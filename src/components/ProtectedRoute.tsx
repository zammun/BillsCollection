import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    // Redirect to login, but save the location they were trying to visit
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;