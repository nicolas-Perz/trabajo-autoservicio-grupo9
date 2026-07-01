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
    secret: session_key || "secreto",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Archivos estáticos
app.use(express.static(join(__dirname, 'src/public')));

// Configurar motor de vistas EJS (apuntando a src/views)
app.set('views', join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Montar routers
app.use("/", viewRoutes);          // Vistas: /productos, etc.
app.use("/api/productos", productRoutes);    // API: /api/productos, etc.
app.use("/auth", authRoutes);      // Login (opcional)


// Ruta raíz
app.get("/", (req, res) => {
    res.send("Servidor funcionando: dirigase a /productos");
});

// Sirve el HTML de productos en la ruta /productos
app.get("/productos", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/productos.html'));
});

// Sirve el HTML de bienvenida en la ruta /bienvenida
app.get("/bienvenida", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/bienvenida.html'));
});

// Sirve el HTML de bienvenida en la ruta /carrito
app.get("/carrito", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/carrito.html'));
});

// Sirve el HTML de bienvenida en la ruta /ticket
app.get("/ticket", (req, res) => {
    res.sendFile(join(__dirname, 'src/public/html/ticket.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`⚙ Servidor corriendo en http://localhost:${PORT}`);
});