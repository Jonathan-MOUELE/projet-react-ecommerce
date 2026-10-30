import { useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Banner from "./components/Banner";
import LeftColumn from "./components/leftcolumn";
import Content from "./components/content";
import RightColumn from "./components/right_column";
import Footer from "./components/footer";
import "./components/Monstyle.css";

function MainLayout() {
  const location = useLocation();
  const estModeAdmin = location.pathname.startsWith("/admin");
  const estSurPagePanier = location.pathname === "/panier";

  // 1. VERSION ADMIN : Interface dédiée en pleine largeur
  if (estModeAdmin) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "20px 0" }}>
        <Content />
      </div>
    );
  }

  // 2. BOUTIQUE : Colonne panier présente partout SAUF sur la page /panier elle-même
  return (
    <div className={`layout ${estSurPagePanier ? "sans-panier-droite" : ""}`}>
      {/* Header */}
      <Banner />

      {/* Navigation gauche */}
      <LeftColumn />

      {/* Contenu central */}
      <Content />

      {/* Colonne droite Panier : présente sur toutes les pages sauf sur /panier ! */}
      {!estSurPagePanier && <RightColumn />}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
