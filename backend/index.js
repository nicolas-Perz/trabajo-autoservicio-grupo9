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

app.listen(PORT, () => {
    console.log(`Corriendo en: http://localhost:${PORT}`);
});