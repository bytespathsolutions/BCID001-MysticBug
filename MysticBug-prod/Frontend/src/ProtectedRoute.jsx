import { useAuth } from "./Context/AuthContext";
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
export default ProtectedRoute;