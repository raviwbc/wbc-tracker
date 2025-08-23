import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    debugger
    // If no token → redirect to login
    return <Navigate to="/login" replace />;
  }

  // If token exists → show the page
  return children;
};

export default ProtectedRoute;
