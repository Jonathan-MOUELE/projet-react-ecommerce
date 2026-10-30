import { Router } from "express";
import { listerProduits } from "../controller/produits.controller.js";

const router = Router();

// GET /api/produits
router.get("/", listerProduits);

export default router;
