import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Catalogue from "./Catalogue";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";
import Auth from "./auth";
import Inscription from "./inscription";
import Compteur from "./Compteur";
import Contact from "./Contact";
import Panier from "./Panier";
import ProtectedRoute from "./ProtectedRoute";

export default function Content() {
  const [authMode, setAuthMode] = useState("connexion");

  return (
    <main className="content">
      <Routes>
        {/* 1. Routes Catalogue (Accueil & /produits) */}
        <Route path="/" element={<Catalogue />} />
        <Route path="/produits" element={<Catalogue />} />

        {/* 2. Routes Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute exigeAdmin={true}>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* 3. Page Auth avec onglets Connexion / Inscription */}
        <Route
          path="/auth"
          element={
            <section>
              <div className="auth-tabs">
                <button
                  type="button"
                  className={`tab-btn ${authMode === "connexion" ? "active" : ""}`}
                  onClick={() => setAuthMode("connexion")}
                >
                  Se connecter
                </button>
                <button
                  type="button"
                  className={`tab-btn ${authMode === "inscription" ? "active" : ""}`}
                  onClick={() => setAuthMode("inscription")}
                >
                  S'inscrire
                </button>
              </div>

              {authMode === "connexion" ? <Auth /> : <Inscription />}
            </section>
          }
        />

        {/* 4. Page Compteur */}
        <Route
          path="/compteur"
          element={
            <section>
              <h2>Page Compteur</h2>
              <Compteur />
            </section>
          }
        />

        {/* 5. Page Contact */}
        <Route
          path="/contact"
          element={
            <section>
              <Contact />
            </section>
          }
        />

        {/* 6. Page Panier */}
        <Route
          path="/panier"
          element={
            <section className="carte">
              <Panier />
            </section>
          }
        />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/produits" replace />} />
      </Routes>
    </main>
  );
}
