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
// Middleware para validar los campos de un formulario
const generosValidos = ["Fantasia", "Ciencia Ficcion"];
const validateLibro = (req, res, next) => {
    const {titulo,imagen,genero,precio} = req.body;
    const errores = [];

    if (!titulo || !imagen || !genero || !precio) {
        errores.push("Faltan campos requeridos");
    }

    if (typeof titulo !== "string" || titulo.trim().length < 2) {
        errores.push("El titulo debe tener al menos 2 caracteres");
    }

    // El precio lo parsearemos previamente en el cliente
    if (typeof precio !== "number" || precio <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    // No validaremos imagen porque luego usaremos Multer

    if (!generosValidos.includes(genero)) {
        errores.push("Genero invalido");
    }

    // Detectamos si existe algun error en la lista y lo devolvemos en un 400
    if (errores.length > 0) {
        return res.status(400).json({message: "Datos invalidos",listaErrores: errores});
    }

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
        let sql = "SELECT id,titulo,imagen,precio,activo FROM libros"
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

app.get("/api/libros/activos", async (req,res) => {
    try{
        let sql = "SELECT id,titulo,imagen,precio,activo FROM libros WHERE libros.activo = FALSE"
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
        let sql = `SELECT id, titulo, imagen, precio, genero, activo FROM libros where id = ?`;
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

app.post("/api/libros", validateLibro, async (req, res) => {
    try {
        const {titulo,imagen,genero,precio} = req.body;
        const cleanTitulo = titulo.trim();

        const sql = "INSERT INTO libros (titulo,imagen,genero,precio) VALUES (?, ?, ?, ?)";

        const [rows] = await connection.query(sql, [cleanTitulo, imagen, genero, precio]);
    
        res.status(201).json({message: `Libro registrado con exito con id ${rows.insertId}`,LibroId: rows.insertId});

    } catch (error) {
        console.log(error);

        res.status(500).json({message: "Error interno del servidor al registrar libros"})
    }
});


app.put("/api/libros", validateLibro, async (req, res) => {
    try {
        let {id,titulo,imagen,genero,precio,activo} = req.body;
        let sql = `UPDATE libros SET titulo = ?, imagen = ?, genero = ?, precio = ?, activo = ? WHERE id = ?`;
        
        const [result] = await connection.query(sql, [titulo,imagen,genero,precio,activo,id]);

        if (result.changedRows === 0) {
            return res.status(404).json({message: `No se actualizo el libro`})
        }
        
        return res.status(200).json({message: "Libro actualizado correctamente"});

    } catch (error) {
        console.log(error);

        res.status(500).json({message: "Error interno del servidor al editar libro"});
    }
});

app.delete("/api/libros/:id", validateId, async (req, res) => {
    try {
        const sql = "DELETE FROM libros WHERE id = ?";
        
        await connection.query(sql, [req.id]);
        
        res.status(200).json({message: `Producto con id ${req.id} eliminado correctamente`});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error interno del servidor al eliminar productos"})
    }
})

app.listen(PORT, () => {
    console.log(`Corriendo en: http://localhost:${PORT}`);
});
