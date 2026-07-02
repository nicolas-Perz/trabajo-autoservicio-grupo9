import { join,__dirname } from "../utils/index.js"
import { selectAllLibros } from "../models/libros.models.js" 

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