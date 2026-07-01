import express from "express"
import connection from "./src/api/database/db.js";
import environments from "./src/api/config/environments.js";
import cors from "cors";

const PORT = environments.port;
const app = express();

app.use(cors());

app.use((req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} | ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`)
    next();
});

// Middlewares
app.use(express.json()); 
app.use(cors());
app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next(); // Pasa al siguiente middleware
});

const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "El ID debe ser un entero positivo"
        });
    }
    req.id = id;
    next();
}

// Opt.1 Try Catch
// Opt.2 Agregar codigos de estado adicionales
// Opt.3 Mejorar consultas SQL (parametros requeridos y variable sql)
// Opt.4 Devolver total de libros con total:rows.length

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.get("/api/libros", async (req,res) => {
    try{
        let sql = "SELECT id,titulo,imagen,precio FROM libros"
        const [rows] = await connection.query(sql)

        if(rows.length === 0){
            res.status(404).json({message:"No se encontraron libros"})
        }

        res.status(200).json({payload:rows,total:rows.length})
    }catch(e){
        console.error(e)
        res.status(500).json({message:"Error interno del servidor"})
    }
});

app.get("/api/libros/:id", validateId, async (req, res) => {
    try {
        let sql = `SELECT id, titulo, imagen, precio, genero FROM libros where id = ?`;
        let [rows] = await connection.query(sql, [req.id]); 

        if(rows.length === 0) {
            return res.status(404).json({
                message: `No se encontro producto con id ${req.id}`
            });
        }

        res.status(200).json({payload:rows});
    } catch (error) {
        console.error(`Error obteniendo producto con id ${req.id}`, error.message);
        
        res.status(500).json({message: "Error interno al obtener un producto por id"});
    }
});

app.get("/api/libros/activos", async (req,res) => {
    try{
        let sql = "SELECT * FROM libros WHERE libros.activo = FALSE"
        const [rows] = await connection.query(sql)
        res.status(200).json({payload:rows})
    }catch(e){
        console.error(e)
    }
});

app.post("/api/libros", async (req, res) => {
    let {titulo,imagen,genero,precio} = req.body;
    let sql = "INSERT INTO libros (titulo,imagen,genero,precio) VALUES (?, ?, ?, ?)";
    await connection.query(sql,[titulo,imagen,genero,precio]);
    res.status(200).json({message: "Libro registrado con exito"});
});

app.put("/api/libros", async (req, res) => {
    let {id,titulo,imagen,genero,precio} = req.body;
    let sql = `UPDATE libros SET titulo = ?, imagen = ?, genero = ?, precio = ? WHERE id = ?`;

    await connection.query(sql, [titulo,imagen,genero,precio,id]);
    return res.status(200).json({message: "Libro actualizado correctamente"});
});

app.delete("/api/libros/:id", async (req, res) => {
    let { id } = req.params;

    await connection.query("DELETE FROM libros WHERE id = ?", [id]);
    res.status(200).json({message: `Libro con id ${id} eliminado correctamente`});
});

app.listen(PORT, () => {
    console.log(`Corriendo en: http://localhost:${PORT}`);
});
