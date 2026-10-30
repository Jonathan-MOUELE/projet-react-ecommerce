import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { utilisateur, deconnecter, produits, ajouterProduit, supprimerProduit } = useAuth();
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("Informatique");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nom.trim() || !prix) return;

    ajouterProduit({
      nom: nom.trim(),
      prix: Number(prix),
      categorie: categorie,
    });

    setMessage(`Produit « ${nom.trim()} » ajouté avec succès.`);
    setNom("");
    setPrix("");
    setTimeout(() => setMessage(""), 3500);
  };

  const handleDeconnexion = () => {
    deconnecter();
    navigate("/admin/login");
  };

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: "0 16px" }}>
      {/* En-tête de l'Espace Admin */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: "2px solid #e2e8f0",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#0f172a" }}>Espace Administrateur</h1>
          <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "0.9rem" }}>
            Connecté : <strong>{utilisateur?.nom || "Admin"}</strong> ({utilisateur?.role})
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            className="counter"
            onClick={() => navigate("/produits")}
            style={{ fontSize: "0.85rem", padding: "8px 14px" }}
          >
            Voir la Boutique
          </button>
          <button
            type="button"
            className="counter reset-btn"
            onClick={handleDeconnexion}
            style={{ fontSize: "0.85rem", padding: "8px 14px" }}
          >
            Déconnexion
          </button>
        </div>
      </header>

      {message && (
        <div
          className="auth-alert"
          style={{
            backgroundColor: "#ecfdf5",
            borderColor: "#a7f3d0",
            color: "#065f46",
            marginBottom: 20,
          }}
        >
          {message}
        </div>
      )}

      {/* Formulaire d'ajout de produit */}
      <div className="carte" style={{ marginBottom: 24 }}>
        <h2 style={{ marginTop: 0, fontSize: "1.2rem", color: "#1e293b" }}>Ajouter un produit</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12 }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Nom du produit :</label>
              <input
                type="text"
                placeholder="Ex: Clavier sans fil"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label>Prix (€) :</label>
              <input
                type="number"
                placeholder="Ex: 49"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label>Catégorie :</label>
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  marginTop: 6,
                }}
              >
                <option value="Informatique">Informatique</option>
                <option value="Accessoires">Accessoires</option>
                <option value="Audio">Audio</option>
                <option value="Divers">Divers</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="counter"
            style={{ marginTop: 16, alignSelf: "flex-start", padding: "8px 16px" }}
          >
            Ajouter au catalogue
          </button>
        </form>
      </div>

      {/* Gestion et suppression des produits */}
      <div className="carte">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: "1.2rem", color: "#1e293b" }}>Gestion des produits du catalogue</h2>
          <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
            Total : <strong>{produits?.length || 0}</strong> produit(s)
          </span>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {(produits || []).map((p) => (
            <li
              key={p.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div>
                <strong style={{ fontSize: "1rem" }}>{p.nom}</strong>
                <span
                  style={{
                    marginLeft: 10,
                    fontSize: "0.8rem",
                    color: "#64748b",
                    backgroundColor: "#f1f5f9",
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                >
                  {p.categorie || "Divers"}
                </span>
                <span style={{ marginLeft: 12, color: "#2563eb", fontWeight: "bold" }}>
                  {p.prix} €
                </span>
              </div>

              <button
                type="button"
                onClick={() => supprimerProduit(p.id)}
                className="counter reset-btn"
                style={{
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                  border: "1px solid #fca5a5",
                  padding: "5px 12px",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
