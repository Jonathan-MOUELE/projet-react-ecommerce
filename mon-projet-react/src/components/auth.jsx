import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Monstyle.css";

export default function Auth() {
  const { utilisateur, connecter, deconnecter } = useAuth();
  const navigate = useNavigate();

  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifiant.trim()) return;

    connecter(identifiant.trim());
    navigate("/produits");
  };

  return (
    <section className="carte" style={{ maxWidth: 450, margin: "20px auto" }}>
      <h2>Connexion Client</h2>

      {utilisateur ? (
        <div className="auth-alert">
          <p>
            Connecté : <strong>{utilisateur.nom || utilisateur.email}</strong> ({utilisateur.role})
          </p>
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <button
              type="button"
              className="counter"
              onClick={() => navigate("/produits")}
            >
              Aller au Catalogue
            </button>
            <button
              type="button"
              className="counter reset-btn"
              onClick={deconnecter}
            >
              Se déconnecter
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Identifiant ou Email :</label>
            <input
              type="text"
              placeholder="Votre identifiant"
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe :</label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="counter" style={{ marginTop: 16, width: "100%" }}>
            Se connecter
          </button>
        </form>
      )}
    </section>
  );
}
