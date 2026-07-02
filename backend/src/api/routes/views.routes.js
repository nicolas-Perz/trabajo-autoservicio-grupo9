import { Router } from 'express'
import { join,__dirname } from '../utils/index.js'
import { indexView } from '../controllers/views.controllers.js'

const router = Router()

router.get("/", indexView)

export default router