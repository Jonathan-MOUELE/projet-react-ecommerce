// Importe Express (framework web pour Node.js)
import express from "express";
// Importe le routeur d'authentification (routes /inscription et /connexion)
import authRoutes from "./routes/auth.routes.js";
// Importe le routeur des produits (route GET /)
import produitsRoutes from "./routes/produits.routes.js";

// Crée l'application Express
const app = express();
// Middleware : lit le JSON envoyé par React
app.use(express.json());

// Monte les routes d'authentification et de produits
app.use("/api", authRoutes);              // /api/inscription, /api/connexion
app.use("/api/produits", produitsRoutes); // /api/produits

// Démarre le serveur sur le port 3000
app.listen(3000, () => console.log("API démarrée sur http://localhost:3000"));