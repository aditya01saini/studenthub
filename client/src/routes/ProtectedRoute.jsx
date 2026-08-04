import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  // User login nahi hai
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User ka role allowed nahi hai
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // User authenticated hai aur role allowed hai
  return children;
};

export default ProtectedRoute;
