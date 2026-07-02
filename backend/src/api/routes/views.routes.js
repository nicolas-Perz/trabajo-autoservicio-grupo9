import { Router } from 'express'
import { join,__dirname } from '../utils/index.js'
import { deleteLibrosView, getLibroView, indexInactiveView, indexView, postLibrosView, putLibrosView } from '../controllers/views.controllers.js'

const router = Router()

router.get("/", indexView)

router.get("/inactivos", indexInactiveView)

router.get("/consultar", getLibroView)

router.get("/modificar", putLibrosView)

router.get("/crear", postLibrosView)

router.get("/eliminar", deleteLibrosView)

export default router