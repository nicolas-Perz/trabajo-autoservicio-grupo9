import { Router } from "express";
import { getAllProducts, getProductById } from "../controllers/book.controllers.js";

const router = Router();

router.get("/", getAllProducts);           // GET /api/libros
router.get("/:id", getProductById);        // GET /api/libros/:id

export default router;