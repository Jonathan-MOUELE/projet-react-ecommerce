import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Inscription() {
  const { inscrireUtilisateur, connecter } = useAuth();
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nom.trim() || !email.trim() || !mdp) return;

    // Inscription publique : toujours un compte client normal
    const nouveauCompte = inscrireUtilisateur({
      nom: nom.trim(),
      email: email.trim(),
      motDePasse: mdp,
      role: "user",
    });

    connecter(nouveauCompte);
    navigate("/produits");
  };

  return (
    <div className="carte" style={{ maxWidth: 450, margin: "20px auto" }}>
      <h2>Créer un compte Client</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Nom :</label>
          <input
            type="text"
            placeholder="Votre nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email :</label>
          <input
            type="email"
            placeholder="votre@email.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Mot de passe :</label>
          <input
            type="password"
            placeholder="••••••••"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="counter" style={{ marginTop: 14 }}>
          S'inscrire et se connecter
        </button>
      </form>
    </div>
  );
}
