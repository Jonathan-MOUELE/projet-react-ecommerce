import { memo } from "react";

function ProduitCard({ produit, onAjouterPanier }) {
  console.log("[rendu] ProduitCard", produit.id);

  return (
    <li
      className="carte"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px",
      }}
    >
      <div>
        <h3 style={{ margin: "0 0 4px 0", fontSize: "1.05rem" }}>{produit.nom}</h3>
        {produit.categorie && (
          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
            {produit.categorie}
          </span>
        )}
        <p style={{ margin: "4px 0 0 0", color: "#2563eb", fontWeight: "bold" }}>
          {produit.prix} €
        </p>
      </div>

      <div>
        {onAjouterPanier && (
          <button
            type="button"
            className="counter"
            onClick={() => onAjouterPanier(produit)}
            title="Ajouter au panier"
            style={{ fontSize: "0.85rem", padding: "6px 14px" }}
          >
            + Panier
          </button>
        )}
      </div>
    </li>
  );
}

export default memo(ProduitCard);
