import { Router } from "express";
import { obtenerLibrosActivos, obtenerLibroActivoPorId } from "../controllers/book.controllers.js";

const router = Router();

router.get("/", obtenerLibrosActivos);           // GET /api/productos
router.get("/:id", obtenerLibroActivoPorId);     // GET /api/productos/:id

export default router;