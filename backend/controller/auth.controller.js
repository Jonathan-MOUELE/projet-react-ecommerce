import { db } from "../db.js";

// POST /api/inscription
export function inscription(req, res) {
  const { nom, prenom, email, password } = req.body;
  if (!nom || !prenom || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  try {
    db.prepare("INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)")
      .run(nom, prenom, email, password);
    res.status(201).json({ message: "Compte créé avec succès" });
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// POST /api/connexion
export function connexion(req, res) {
  const { email, password } = req.body;
  const user = db.prepare("SELECT id, prenom, nom FROM utilisateurs WHERE email = ? AND mot_de_passe = ?")
    .get(email, password);

  if (!user) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect." });
  }
  res.json({ id: user.id, prenom: user.prenom, nom: user.nom });
}
