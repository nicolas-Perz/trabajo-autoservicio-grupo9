
// MIDDLEWARES

export const loggerURL = (req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} | ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`)
    next();
};

export const validateId = (req, res, next) => {
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
const generosValidos = ["Fantasia", "Ciencia Ficcion","Terror","Misterio","Drama"];

export const validateLibro = (req, res, next) => {
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

export const requireLogin = (req,res,next) => {
    // Si no existe la sesión, devuelta a la pantalla login
    if(!req.session.user){
        return res.redirect("/login")
    }

    next()
}