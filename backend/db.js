// Connexion SQLite avec better-sqlite3
import Database from "better-sqlite3";

export const db = new Database("boutique.db");
db.pragma("foreign_keys = ON"); // Active les clés étrangères

// Initialisation des tables SQLite (schéma strict du cours : id, nom, prix)
db.exec(`
CREATE TABLE IF NOT EXISTS utilisateurs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mot_de_passe TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS produits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  prix REAL NOT NULL
);
`);

// Données de départ des lignes multimodales AeroRails si la table est vide
const { total } = db.prepare("SELECT COUNT(*) AS total FROM produits").get();
if (total === 0) {
  const ajouter = db.prepare("INSERT INTO produits (nom, prix) VALUES (?, ?)");
  ajouter.run("Lyon → Amsterdam (TGV INOUI + Air France)", 320);
  ajouter.run("Paris → Berlin (TGV Lyria + Lufthansa)", 380);
  ajouter.run("Marseille → Londres (TGV + Eurostar)", 350);
  ajouter.run("Bordeaux → Rome (TGV + ITA Airways)", 320);
}

// Utilisateur test par défaut (Camille Martin)
const user = db.prepare("SELECT id FROM utilisateurs WHERE email = ?").get("camille.martin@example.com");
if (!user) {
  db.prepare("INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)")
    .run("Martin", "Camille", "camille.martin@example.com", "AeroRails2026!");
}