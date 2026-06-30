import connection from "../database/ddbb.js";

const selectAllBooksActive = () => {
    const sql = `
        SELECT id, titulo, genero, imagen, precio
        FROM libros
        WHERE activo = 1
    `;
    return connection.query(sql);
};

const selectBooksById = (id) => {
    const sql = `
        SELECT id, titulo, genero, imagen, precio
        FROM libros
        WHERE id = ? AND activo = 1
    `;
    return connection.query(sql, [id]);
};

export default {
    selectAllBooksActive,
    selectBooksById
};