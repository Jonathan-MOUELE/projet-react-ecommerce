import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Menu() {
  const { estAdmin, utilisateur } = useAuth();

  return (
    <nav className="menu">
      <Link to="/auth" style={{ color: "#fff", textDecoration: "none", fontSize: "0.95rem" }}>
        {utilisateur ? utilisateur.nom || utilisateur.email : "Connexion"}
      </Link>
      {estAdmin && (
        <Link to="/admin" style={{ color: "#facc15", fontWeight: "bold", marginLeft: 16 }}>
          Administration
        </Link>
      )}
    </nav>
  );
}
