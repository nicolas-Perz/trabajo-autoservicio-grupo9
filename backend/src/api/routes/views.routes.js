import { Router } from 'express'
import { join,__dirname } from '../utils/index.js'
import { deleteLibrosView, getLibroView, indexInactiveView, indexView, postLibrosView, putLibrosView } from '../controllers/views.controllers.js'
import { requireLogin } from '../middlewares/middlewares.js'

const router = Router()

router.get("/",requireLogin,indexView)

router.get("/inactivos",requireLogin,indexInactiveView)

router.get("/consultar",requireLogin,getLibroView)

router.get("/modificar",requireLogin,putLibrosView)

router.get("/crear",requireLogin,postLibrosView)

router.get("/eliminar",requireLogin,deleteLibrosView)

export default router