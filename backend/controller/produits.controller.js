// Importe la connexion à la base SQLite depuis db.js
import { db } from "../db.js";

// Fonction appelée par la route GET /api/produits
export function listerProduits(req, res) {
  const produits = db
    .prepare("SELECT id, nom, prix FROM produits ORDER BY nom")
    .all();
  res.json(produits);
}
