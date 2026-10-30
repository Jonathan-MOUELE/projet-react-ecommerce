import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { normaliser } from "../utils/texte";
import { useDebounce } from "../hooks/useDebounce";
import BarreRecherche from "./BarreRecherche";
import ProduitCard from "./ProduitCard";

export default function Catalogue() {
  const { utilisateur, deconnecter, produits, ajouterAuPanier } = useAuth();
  const navigate = useNavigate();

  const [saisie, setSaisie] = useState("");
  const terme = useDebounce(saisie, 300);
  const inputRef = useRef(null);

  console.log("[rendu] Catalogue, saisie =", saisie, "| terme =", terme);

  // Raccourci clavier : la touche "/" donne le focus à la barre de recherche
  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    console.log("[useEffect] écouteur clavier ajouté");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      console.log("[useEffect] écouteur clavier retiré");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // useMemo : ne recalcule le filtrage que si le terme validé ou les produits changent
  const produitsFiltres = useMemo(() => {
    console.log("[useMemo] filtrage pour :", terme);
    const t = normaliser(terme);
    return (produits || []).filter((p) => normaliser(p.nom).includes(t));
  }, [terme, produits]);

  const handleAjouterPanier = useCallback(
    (produit) => {
      ajouterAuPanier(produit);
    },
    [ajouterAuPanier]
  );

  const effacer = () => {
    setSaisie("");
    inputRef.current?.focus();
  };

  const handleDeconnexion = () => {
    deconnecter();
    navigate("/auth", { replace: true });
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <span>
          Connecté en tant que : <strong>{utilisateur?.nom || "Invité"}</strong>{" "}
          {utilisateur?.role === "admin" && (
            <span style={{ color: "#dc2626", fontWeight: "bold" }}>[Admin]</span>
          )}
        </span>
        {utilisateur && (
          <button
            type="button"
            className="counter reset-btn"
            onClick={handleDeconnexion}
          >
            Se déconnecter
          </button>
        )}
      </header>

      <h2>Catalogue des Produits</h2>

      <BarreRecherche
        valeur={saisie}
        onChange={setSaisie}
        onEffacer={effacer}
        inputRef={inputRef}
      />

      <p style={{ color: "#475569" }}>
        <strong>{produitsFiltres.length}</strong> résultat(s)
        {saisie !== terme && (
          <small style={{ color: "#2563eb" }}> – recherche en cours…</small>
        )}
      </p>

      {produitsFiltres.length === 0 && (
        <div className="auth-alert" style={{ backgroundColor: "#fef2f2", borderColor: "#fecaca", color: "#991b1b" }}>
          Aucun produit ne correspond à « <strong>{terme}</strong> ».
        </div>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {produitsFiltres.map((p) => (
          <ProduitCard
            key={p.id}
            produit={p}
            onAjouterPanier={handleAjouterPanier}
          />
        ))}
      </ul>
    </div>
  );
}
