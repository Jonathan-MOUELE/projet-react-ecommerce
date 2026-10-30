import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, exigeAdmin = false }) {
  const { utilisateur, estAdmin } = useAuth();

  if (exigeAdmin && !estAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!utilisateur) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
