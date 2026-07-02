
// ENDPOINTS

import { Router } from 'express'
import { validateId, validateLibro } from '../middlewares/middlewares.js';
import { createLibro, getAllLibros, getLibroByID, getLibrosInactivos, modifyLibro, removeLibro,  } from '../controllers/libros.controllers.js';

const router = Router()


router.get("/", getAllLibros);

router.get("/inactivos", getLibrosInactivos);

router.get("/:id", validateId, getLibroByID);

router.post("/", validateLibro, createLibro);

router.put("/", validateLibro, modifyLibro);

router.delete("/:id", validateId, removeLibro)

export default router
// Todas las rutas se exportan a /routes/index.js