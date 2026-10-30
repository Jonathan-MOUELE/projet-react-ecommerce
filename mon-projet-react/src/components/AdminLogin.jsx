import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Monstyle.css";

export default function AdminLogin() {
  const { connecter, inscrireUtilisateur } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("connexion"); // "connexion" ou "creation"
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [erreur, setErreur] = useState("");

  const handleConnexion = (e) => {
    e.preventDefault();
    setErreur("");

    if (!identifiant.trim()) return;

    // Se connecte en forçant la recherche du compte admin ou compte par défaut admin
    const idSaisi = identifiant.trim();
    const session = connecter(idSaisi, "admin");

    if (session?.role === "admin" || idSaisi.toLowerCase() === "admin") {
      navigate("/admin");
    } else {
      setErreur("Accès refusé : identifiants incorrects ou droits administrateur non attribués.");
    }
  };

  const handleCreation = (e) => {
    e.preventDefault();
    setErreur("");

    if (!identifiant.trim() || !password || !nom.trim()) {
      setErreur("Veuillez remplir tous les champs.");
      return;
    }

    // Crée un compte directement avec le rôle admin
    const nouveauCompte = inscrireUtilisateur({
      nom: nom.trim(),
      email: `${identifiant.trim()}@admin.fr`,
      identifiant: identifiant.trim(),
      motDePasse: password,
      role: "admin",
    });

    connecter(nouveauCompte);
    navigate("/admin");
  };

  return (
    <div style={{ maxWidth: 440, margin: "50px auto" }}>
      <section className="carte" style={{ padding: "28px" }}>
        <h2 style={{ margin: "0 0 6px 0", textAlign: "center", color: "#1e293b" }}>
          Espace Administration
        </h2>
        <p style={{ fontSize: "0.85rem", color: "#64748b", textAlign: "center", margin: "0 0 20px 0" }}>
          Gestion du catalogue et des produits
        </p>

        {/* Onglets Connexion / Création de compte admin */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button
            type="button"
            className={`tab-btn ${mode === "connexion" ? "active" : ""}`}
            onClick={() => {
              setMode("connexion");
              setErreur("");
            }}
            style={{ flex: 1, padding: "8px" }}
          >
            Connexion Admin
          </button>
          <button
            type="button"
            className={`tab-btn ${mode === "creation" ? "active" : ""}`}
            onClick={() => {
              setMode("creation");
              setErreur("");
            }}
            style={{ flex: 1, padding: "8px" }}
          >
            Créer un compte Admin
          </button>
        </div>

        {erreur && (
          <div className="auth-alert" style={{ backgroundColor: "#fef2f2", borderColor: "#fecaca", color: "#991b1b" }}>
            {erreur}
          </div>
        )}

        {mode === "connexion" ? (
          <form onSubmit={handleConnexion} className="auth-form">
            <div className="form-group">
              <label>Identifiant Administrateur :</label>
              <input
                type="text"
                placeholder="Ex: admin"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Mot de passe :</label>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="counter"
              style={{
                marginTop: 16,
                width: "100%",
                padding: "10px",
                backgroundColor: "#0f172a",
                color: "#fff",
              }}
            >
              Se connecter à l'espace Admin
            </button>
          </form>
        ) : (
          <form onSubmit={handleCreation} className="auth-form">
            <div className="form-group">
              <label>Nom de l'administrateur :</label>
              <input
                type="text"
                placeholder="Ex: Bob Noll"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Identifiant de connexion :</label>
              <input
                type="text"
                placeholder="Ex: bobnoll"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Mot de passe :</label>
              <input
                type="password"
                placeholder="Choisir un mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="counter"
              style={{
                marginTop: 16,
                width: "100%",
                padding: "10px",
                backgroundColor: "#0f172a",
                color: "#fff",
              }}
            >
              Créer le compte et accéder à l'Admin
            </button>
          </form>
        )}

        <div style={{ marginTop: 24, textAlign: "center", fontSize: "0.85rem" }}>
          <Link to="/produits" style={{ color: "#64748b", textDecoration: "none" }}>
            Retour à la boutique
          </Link>
        </div>
      </section>
    </div>
  );
}
