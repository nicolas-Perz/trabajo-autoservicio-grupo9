import { Router } from "express";
import { obtenerLibrosActivos, obtenerLibroActivoPorId } from "../controllers/book.controllers.js";

const router = Router();

router.get("/", obtenerLibrosActivos);           // GET /api/libros
router.get("/:id", obtenerLibroActivoPorId);        // GET /api/libros/:id

export default router;