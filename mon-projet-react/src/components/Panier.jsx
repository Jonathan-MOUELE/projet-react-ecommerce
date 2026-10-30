import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Panier() {
  const {
    panier,
    ajouterAuPanier,
    retirerDuPanier,
    supprimerDuPanier,
    viderPanier,
    totalPanier,
    nombreArticlesPanier,
  } = useAuth();

  const [commandeValidee, setCommandeValidee] = useState(false);

  const handleCommander = () => {
    if (panier.length === 0) return;
    setCommandeValidee(true);
    viderPanier();
    setTimeout(() => setCommandeValidee(false), 4000);
  };

  return (
    <div className="panier-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Panier</h2>
        <span
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            borderRadius: "12px",
            padding: "2px 8px",
            fontSize: "0.85rem",
            fontWeight: "bold",
          }}
        >
          {nombreArticlesPanier}
        </span>
      </div>

      {commandeValidee && (
        <div
          className="auth-alert"
          style={{
            backgroundColor: "#ecfdf5",
            borderColor: "#a7f3d0",
            color: "#065f46",
            padding: "8px",
            marginTop: "12px",
            fontSize: "0.85rem",
          }}
        >
          Merci pour votre commande !
        </div>
      )}

      {panier.length === 0 ? (
        <p style={{ color: "#94a3b8", fontStyle: "italic", marginTop: "16px" }}>
          Votre panier est vide.
        </p>
      ) : (
        <div style={{ marginTop: "12px" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {panier.map((item) => (
              <li
                key={item.id}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1e293b" }}>
                    {item.nom}
                  </span>
                  <button
                    type="button"
                    onClick={() => supprimerDuPanier(item.id)}
                    title="Supprimer cet article"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#94a3b8",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      padding: "0 4px",
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <button
                      type="button"
                      onClick={() => retirerDuPanier(item.id)}
                      style={{
                        width: "22px",
                        height: "22px",
                        border: "1px solid #cbd5e1",
                        background: "#fff",
                        borderRadius: "4px",
                        cursor: "pointer",
                        lineHeight: 1,
                        fontSize: "0.85rem",
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: "0.9rem", fontWeight: "bold", minWidth: "16px", textAlign: "center" }}>
                      {item.quantite}
                    </span>
                    <button
                      type="button"
                      onClick={() => ajouterAuPanier(item)}
                      style={{
                        width: "22px",
                        height: "22px",
                        border: "1px solid #cbd5e1",
                        background: "#fff",
                        borderRadius: "4px",
                        cursor: "pointer",
                        lineHeight: 1,
                        fontSize: "0.85rem",
                      }}
                    >
                      +
                    </button>
                  </div>

                  <span style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#2563eb" }}>
                    {item.prix * item.quantite} €
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "16px",
              paddingTop: "12px",
              borderTop: "2px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#475569" }}>Total articles :</span>
              <strong>{nombreArticlesPanier}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem", marginBottom: "12px" }}>
              <span style={{ color: "#0f172a", fontWeight: "bold" }}>Total :</span>
              <strong style={{ color: "#2563eb" }}>{totalPanier} €</strong>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <button
                type="button"
                className="counter"
                onClick={handleCommander}
                style={{ width: "100%", padding: "8px" }}
              >
                Commander
              </button>
              <button
                type="button"
                className="counter reset-btn"
                onClick={viderPanier}
                style={{ width: "100%", padding: "6px", fontSize: "0.85rem" }}
              >
                Vider le panier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

