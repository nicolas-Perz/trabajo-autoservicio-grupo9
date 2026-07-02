
// Archivo "de barril" que contiene todas las rutas

import libroRoutes from "./libros.routes.js"
import viewsRoutes from "./views.routes.js"
import authRoutes from "./auth.routes.js"

export{
    libroRoutes,
    viewsRoutes,
    authRoutes
} // -> Se exportan hacia el index.js "principal"