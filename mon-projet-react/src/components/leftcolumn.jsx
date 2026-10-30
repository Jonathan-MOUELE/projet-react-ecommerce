import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LeftColumn() {
  const { estAdmin } = useAuth();

  return (
    <aside className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li>
          <Link to="/produits">Catalogue</Link>
        </li>
        <li>
          <Link to="/compteur">Compteur</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {estAdmin && (
          <li style={{ marginTop: 16 }}>
            <Link to="/admin" style={{ fontWeight: "bold", color: "#2563eb" }}>
              Espace Administrateur
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}
