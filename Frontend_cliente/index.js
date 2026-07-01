import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { join, __dirname } from "./src/api/utils/index.js";
import { viewRoutes, productRoutes, authRoutes } from "./src/api/routes/index.js";
import environments from "./src/api/config/environments.js";

dotenv.config();
const { port, session_key } = environments;
const PORT = port || 3001;

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sesión (para login)
app.use(session({
    secret: session_key || "mi-secreto",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // cambiar a true en producción con HTTPS
}));

// Archivos estáticos
app.use(express.static(join(__dirname, 'src/public')));

// Configurar motor de vistas EJS (apuntando a src/views)
app.set('views', join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Montar routers
app.use("/", viewRoutes);          // Vistas: /productos, etc.
app.use("/api", productRoutes);    // API: /api/libros, etc.
app.use("/auth", authRoutes);      // Login (opcional)

// Ruta raíz (opcional)
app.get("/", (req, res) => {
    res.send("Servidor funcionando: dirigase a /productos");
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`⚙ Servidor corriendo en http://localhost:${PORT}`);
});