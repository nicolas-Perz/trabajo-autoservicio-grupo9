
// CONTROLADORES DE LIBROS

import { deleteLibro, insertLibro, selectAllLibros, selectInactiveLibros, selectLibroById, updateLibro } from "../models/libros.models.js"

export const getAllLibros = async (req,res) => {
    try{
        const [rows] = await selectAllLibros()

        if(rows.length === 0){
            res.status(404).json({message:"No se encontraron libros"})
        }

        res.status(200).json({payload:rows,total:rows.length})
    }catch(e){
        console.error(e)
        res.status(500).json({message:"Error interno del servidor"})
    }
}

export const getLibrosInactivos = async (req,res) => {
    try{
        const [rows] = await selectInactiveLibros()

        if(rows.length === 0){
            res.status(404).json({message:"No se encontraron libros"})
        }

        res.status(200).json({payload:rows,total:rows.length})
    }catch(e){
        console.error(e)
        res.status(500).json({message:"Error interno del servidor"})
    }
}

export const getLibroByID = async (req, res) => {
    try {
        let [rows] = await selectLibroById(req.id)

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
}

export const createLibro = async (req, res) => {
    try {
        const {titulo,imagen,genero,precio} = req.body;
        const cleanTitulo = titulo.trim();

        const [rows] = await insertLibro(cleanTitulo,imagen,genero,precio)
    
        res.status(201).json({message: `Libro registrado con exito con id ${rows.insertId}`,LibroId: rows.insertId});

    } catch (error) {
        console.log(error);

        res.status(500).json({message: "Error interno del servidor al registrar libros"})
    }
}

export const modifyLibro = async (req, res) => {
    try {
        let {id,titulo,imagen,genero,precio,activo} = req.body;

        const [result] = await updateLibro(id,titulo,imagen,genero,precio,activo)

        if (result.changedRows === 0) {
            return res.status(404).json({message: `No se actualizo el libro`})
        }
        
        return res.status(200).json({message: "Libro actualizado correctamente"});

    } catch (error) {
        console.log(error);

        res.status(500).json({message: "Error interno del servidor al editar libro"});
    }
}

export const removeLibro = async (req, res) => {
    try {
        await deleteLibro(req.id);
        
        res.status(200).json({message: `Producto con id ${req.id} eliminado correctamente`});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error interno del servidor al eliminar productos"})
    }
}