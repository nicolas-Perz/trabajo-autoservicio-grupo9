import { join,__dirname } from "../utils/index.js"
import { insertLibro, selectAllLibros, selectInactiveLibros, selectLibroById, updateLibro } from "../models/libros.models.js" 

export const indexView = async (req,res) => {
    try{
        const [rows] = await selectAllLibros()

        res.render("index",{
        title: "Dashboard",
        about: "Nuestros productos",
        librosArray: rows
    })
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Error interno"})
    }
}

export const indexInactiveView = async (req,res) => {
    try{
        const rows = await selectInactiveLibros()

        res.render("inactivos",{
        title: "Inactivos",
        about: "Libros en estado inactivos",
        librosInactivosArray: rows
    })
    }catch(e){
        console.error(e.message)
        res.status(500).json({message:"Error interno"})
    }
}

export const getLibroView = (req,res) => {
    res.render("get",{
        title: "Consultar libro",
        about: "Consultar libro via ID:",
    })
}

export const putLibrosView = (req,res) => {
    res.render("put",{
        title: "Modificar libro",
        about: "Consultar libro via ID: "
    })
}

export const postLibrosView = (req,res) => {
    res.render("post",{
        title: "Crear libro",
        about: "Crear nuevo libro: "
    })
}

export const deleteLibrosView = (req,res) => {
    res.render("delete",{
        title: "Eliminar libro",
        about: "Consultar libro via ID: "
    })
}