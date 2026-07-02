import express from "express"
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { libroRoutes } from "./src/api/routes/index.js";

const PORT = environments.port;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 
app.use(loggerURL)

// Opt.1 Try Catch
// Opt.2 Agregar codigos de estado adicionales
// Opt.3 Mejorar consultas SQL (parametros requeridos y variable sql)
// Opt.4 Devolver total de libros con total:rows.length

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.use("/api/libros", libroRoutes)

app.listen(PORT, () => {
    console.log(`Corriendo en: http://localhost:${PORT}`);
});
