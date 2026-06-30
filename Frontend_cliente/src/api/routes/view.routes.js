import { Router } from "express";
import { indexView } from "../controllers/view.controllers.js";

const router = Router();

// Ruta que renderiza la vista de productos
router.get("/productos", indexView);

export default router;