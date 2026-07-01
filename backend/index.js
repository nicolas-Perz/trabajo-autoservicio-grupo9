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



app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.get("/api/libros", async (req,res) => {
    try{
        let sql = "SELECT * FROM libros"
        const [rows] = await connection.query(sql)
        res.status(200).json({payload:rows})
    }catch(e){
        console.error(e)
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

app.get("/api/libros/:id", async (req, res) => {
    const id = req.params.id;
    let sql = "SELECT * FROM libros WHERE libros.id = ?"
    const [ rows ] = await connection.query(sql,[id]);
    
    res.status(200).json({
        payload: rows
    });
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

app.listen(PORT, () => {
    console.log(`Corriendo en: http://localhost:${PORT}`);
});
