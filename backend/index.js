import express from "express"
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { libroRoutes, viewsRoutes } from "./src/api/routes/index.js";
import { join,__dirname } from "./src/api/utils/index.js";

const PORT = environments.port;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 
app.use(loggerURL)

app.use(express.static(join(__dirname,"src/public")))

app.set("view engine","ejs")
app.set("views",join(__dirname,"src/views"))

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.use("/api/libros", libroRoutes)

app.use("/dashboard",viewsRoutes)

app.listen(PORT, () => {
    console.log(`Corriendo en: http://localhost:${PORT}`);
});
