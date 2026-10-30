import { Router } from "express";
import { inscription, connexion } from "../controller/auth.controller.js";

const router = Router();

// Routes /api/inscription et /api/connexion
router.post("/inscription", inscription);
router.post("/connexion", connexion);

export default router;
