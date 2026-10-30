import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { PRODUITS } from "../data/produits";

const AuthContext = createContext(null);

// Comptes par défaut permanents
const COMPTES_INITIAUX = [
  {
    id: 1,
    nom: "Admin",
    prenom: "Super",
    email: "admin@shop.fr",
    identifiant: "admin",
    motDePasse: "admin123",
    role: "admin",
  },
  {
    id: 2,
    nom: "Alice",
    prenom: "Dupont",
    email: "alice@example.com",
    identifiant: "alice",
    motDePasse: "react123",
    role: "user",
  },
];

export function AuthProvider({ children }) {
  // 1. Liste des comptes enregistrés (persiste dans localStorage)
  const [comptes, setComptes] = useState(() => {
    try {
      const stocke = localStorage.getItem("comptes_utilisateurs");
      return stocke ? JSON.parse(stocke) : COMPTES_INITIAUX;
    } catch {
      return COMPTES_INITIAUX;
    }
  });

  // Sauvegarde des comptes dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem("comptes_utilisateurs", JSON.stringify(comptes));
    } catch (e) {
      console.error("Erreur sauvegarde comptes", e);
    }
  }, [comptes]);

  // 2. Session utilisateur connectée (persiste dans localStorage pour ne JAMAIS perdre le rôle admin)
  const [utilisateur, setUtilisateur] = useState(() => {
    try {
      const session = localStorage.getItem("session_utilisateur");
      if (session) {
        return JSON.parse(session);
      }
    } catch (e) {
      console.error("Erreur lecture session", e);
    }
    // Par défaut, Alice (connectée comme dans le TP)
    return COMPTES_INITIAUX[1];
  });

  // Sauvegarde de la session active
  useEffect(() => {
    try {
      if (utilisateur) {
        localStorage.setItem("session_utilisateur", JSON.stringify(utilisateur));
      } else {
        localStorage.removeItem("session_utilisateur");
      }
    } catch (e) {
      console.error("Erreur écriture session", e);
    }
  }, [utilisateur]);

  // 3. Liste dynamique des produits (persiste aussi dans localStorage)
  const [produits, setProduits] = useState(() => {
    try {
      const prods = localStorage.getItem("produits_catalogue");
      return prods ? JSON.parse(prods) : PRODUITS;
    } catch {
      return PRODUITS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("produits_catalogue", JSON.stringify(produits));
    } catch (e) {
      console.error("Erreur sauvegarde produits", e);
    }
  }, [produits]);

  // 4. Panier interactif
  const [panier, setPanier] = useState(() => {
    try {
      const p = localStorage.getItem("panier_articles");
      return p ? JSON.parse(p) : [
        { id: 1, nom: "Clavier mécanique", prix: 89, quantite: 1 },
        { id: 2, nom: "Souris sans fil", prix: 35, quantite: 1 },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("panier_articles", JSON.stringify(panier));
    } catch (e) {
      console.error("Erreur sauvegarde panier", e);
    }
  }, [panier]);

  // Inscription d'un nouveau compte
  const inscrireUtilisateur = useCallback((nouveauCompte) => {
    const compteFinal = {
      id: Date.now(),
      nom: nouveauCompte.nom || "Utilisateur",
      prenom: nouveauCompte.prenom || "",
      email: nouveauCompte.email,
      identifiant: nouveauCompte.identifiant || nouveauCompte.email.split("@")[0],
      motDePasse: nouveauCompte.motDePasse || nouveauCompte.mdp || "",
      role: nouveauCompte.role || "user", // "admin" ou "user"
    };

    setComptes((prev) => [...prev, compteFinal]);
    return compteFinal;
  }, []);

  // Connexion intelligente avec vérification et persistance
  const connecter = useCallback(
    (identifiantOuObjet, roleForce = null) => {
      // Cas 1 : objet complet passé
      if (typeof identifiantOuObjet === "object" && identifiantOuObjet !== null) {
        setUtilisateur(identifiantOuObjet);
        return identifiantOuObjet;
      }

      const idSaisi = String(identifiantOuObjet || "").trim().toLowerCase();

      // Vérifier si le compte existe dans la liste des comptes
      const compteExistant = comptes.find(
        (c) =>
          c.identifiant.toLowerCase() === idSaisi ||
          c.email.toLowerCase() === idSaisi
      );

      let session;
      if (compteExistant) {
        session = { ...compteExistant };
      } else {
        // Nouveau compte client créé à la volée si inexistant
        const estAdmin = idSaisi === "admin";
        session = {
          id: Date.now(),
          nom: identifiantOuObjet,
          prenom: "",
          email: `${idSaisi}@example.com`,
          identifiant: idSaisi,
          role: estAdmin ? "admin" : "user",
        };
      }

      setUtilisateur(session);
      return session;
    },
    [comptes]
  );

  const deconnecter = useCallback(() => {
    setUtilisateur(null);
    try {
      localStorage.removeItem("session_utilisateur");
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Gestion des produits (Admin)
  const ajouterProduit = useCallback((nouveauProduit) => {
    setProduits((prev) => [
      {
        id: Date.now(),
        nom: nouveauProduit.nom,
        prix: Number(nouveauProduit.prix),
        categorie: nouveauProduit.categorie || "Divers",
      },
      ...prev,
    ]);
  }, []);

  const supprimerProduit = useCallback((id) => {
    setProduits((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Actions sur le panier
  const ajouterAuPanier = useCallback((produit) => {
    setPanier((prev) => {
      const existant = prev.find((item) => item.id === produit.id);
      if (existant) {
        return prev.map((item) =>
          item.id === produit.id
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      }
      return [...prev, { ...produit, quantite: 1 }];
    });
  }, []);

  const retirerDuPanier = useCallback((id) => {
    setPanier((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantite: item.quantite - 1 } : item
        )
        .filter((item) => item.quantite > 0)
    );
  }, []);

  const supprimerDuPanier = useCallback((id) => {
    setPanier((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const viderPanier = useCallback(() => {
    setPanier([]);
  }, []);

  const totalPanier = useMemo(
    () => panier.reduce((acc, item) => acc + item.prix * item.quantite, 0),
    [panier]
  );

  const nombreArticlesPanier = useMemo(
    () => panier.reduce((acc, item) => acc + item.quantite, 0),
    [panier]
  );

  const estAdmin = utilisateur?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        utilisateur,
        comptes,
        connecter,
        deconnecter,
        inscrireUtilisateur,
        estAdmin,
        produits,
        ajouterProduit,
        supprimerProduit,
        panier,
        ajouterAuPanier,
        retirerDuPanier,
        supprimerDuPanier,
        viderPanier,
        totalPanier,
        nombreArticlesPanier,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
}
