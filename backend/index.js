import express from "express"
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { authRoutes, libroRoutes, viewsRoutes } from "./src/api/routes/index.js";
import { join,__dirname } from "./src/api/utils/index.js";
import session from "express-session";

const app = express();


const {port,session_key} = environments
const PORT = port;

// Middlewares
app.use(cors());
app.use(express.json()); 
// Middleware para parsear información enviada a traves de un <form> html
app.use(express.urlencoded({
    extended: true
}))
app.use(loggerURL)

app.use(express.static(join(__dirname,"src/public")))

app.set("view engine","ejs")
app.set("views",join(__dirname,"src/views"))

// Middlewares - Sesiones

app.use(session({ 
    secret: session_key, // Firma cookies para evitar manipulacion 
    resave: false, // Evita guardar la session si no hubieron cambios
    saveUnitialized: true // No guarda sesiones vacias
}))


// ENDPOINTS
app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.use("/api/libros", libroRoutes)

app.use("/dashboard",viewsRoutes)

app.use("/login", authRoutes)

app.listen(PORT, () => {
    console.log(`Corriendo en: http://localhost:${PORT}`);
});
