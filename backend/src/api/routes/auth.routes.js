
// RUTAS DE AUTENTIFICACION

import { Router } from 'express'
import { destroyLogin, loginView, processLoginInfo } from '../controllers/auth.controllers.js';

const router = Router()

router.get("/", loginView);

router.post("/", processLoginInfo)

router.post("/destroy", destroyLogin)

export default router
// Todas las rutas se exportan a /routes/index.js