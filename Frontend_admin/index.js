import express from "express";
import connection from "./src/api/database/ddbb.js";
import environments from "./src/api/config/environments.js";

const app = express();

app.get("/", (req, res) => {
    res.send("!Hola mundo desde LocalHost!");
});

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto 3000`);
});

// Endpoint para obtener todos los libros.
app.get("/api/libros", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM libros");

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.error("Error al obtener libros:", error.message);
    }
});

// Endpoint para obtener todos los libros activos.
app.get("/api/libros/activo", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM libros WHERE libros.activo = 1");

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.error("Error al obtener libros activos:", error.message);
    }
});

// Endpoint para obtener todos los libros por ID.
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