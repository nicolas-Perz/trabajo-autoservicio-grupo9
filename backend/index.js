import express from "express"
import connection from "./src/api/database/db.js";

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.get("/api/libros", async (req,res) => {
    try{
        const [rows] = await connection.query("SELECT * FROM libros")
        res.status(200).json({payload:rows})
    }catch(e){
        console.error(e)
    }
})

app.get("/api/libros/activos", async (req,res) => {
    try{
        const [rows] = await connection.query("SELECT * FROM libros WHERE libros.activo = FALSE")
        res.status(200).json({payload:rows})
    }catch(e){
        console.error(e)
    }
})

app.get("/api/libros/:id", async (req, res) => {
    const id = req.params.id;

    const [ rows ] = await connection.query("SELECT * FROM libros WHERE libros.id = ?", [id]);
    
    res.status(200).json({
        payload: rows
    });
});

// Endpoint para crear un nuevo libro.
app.post("/api/libros", async (req, res) => {
    let { titulo, genero, imagen, precio } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({
            mensaje: "Nombre y precio faltantes."
        })
    }

    try {
        const sqlInsert = "INSERT INTO libros (titulo, genero, imagen, precio) VALUES (?, ?, ?, ?)";
    
        const [resultado] = await connection.execute(sqlInsert, [titulo, genero, imagen, precio]);
    
        console.log(resultado);
    
        res.status(201).json({
            mensaje: `Producto creado: ${resultado}`
        })
    } catch (error) {
        console.error("Error al crear un producto:", error.message);
        res.status(500).json({
            mensaje: "Error interno del servidor."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Corriendo en: http://localhost:${PORT}`);
});
