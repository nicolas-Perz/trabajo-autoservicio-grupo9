
// MODELOS DE LIBROS

import connection from "../database/db.js";

export const selectAllLibros = () => {
    let sql = "SELECT id,titulo,imagen,precio,activo FROM libros"
    return connection.query(sql)
}

export const selectInactiveLibros = () => {
    let sql = "SELECT id,titulo,imagen,precio,activo FROM libros WHERE libros.activo = FALSE"
    return connection.query(sql)
}

export const selectLibroById = (id) => {
    let sql = `SELECT id, titulo, imagen, precio, genero, activo FROM libros where id = ?`;
    return connection.query(sql, [id]); 
}

export const insertLibro = (titulo,imagen,genero,precio) => {
    const sql = "INSERT INTO libros (titulo,imagen,genero,precio) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [titulo, imagen, genero, precio]);
}

export const updateLibro = (id,titulo,imagen,genero,precio,activo) => {
    let sql = `UPDATE libros SET titulo = ?, imagen = ?, genero = ?, precio = ?, activo = ? WHERE id = ?`;
    return connection.query(sql, [titulo,imagen,genero,precio,activo,id]);
}

export const deleteLibro = (id) => {
    const sql = "DELETE FROM libros WHERE id = ?";
    return connection.query(sql, [id]);
}