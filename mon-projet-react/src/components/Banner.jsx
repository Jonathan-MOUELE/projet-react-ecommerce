import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Menu from "./Menu";

export default function Banner() {
  const { nombreArticlesPanier } = useAuth();

  return (
    <header className="banner">
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <h1 style={{ margin: 0, fontSize: "1.4rem" }}>
          <Link to="/produits" style={{ color: "#fff", textDecoration: "none" }}>
            Ma boutique
          </Link>
        </h1>
        <Link
          to="/panier"
          style={{
            color: "#fff",
            textDecoration: "none",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            padding: "6px 14px",
            borderRadius: "6px",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          Panier ({nombreArticlesPanier})
        </Link>
      </div>
      <Menu />
    </header>
  );
}
