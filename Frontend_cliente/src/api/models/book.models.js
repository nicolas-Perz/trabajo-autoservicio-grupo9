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

const selectBooksOrdered = (campo, direccion = 'ASC') => {
    const camposPermitidos = ['titulo', 'precio'];

    if (!camposPermitidos.includes(campo)) {
        campo = 'titulo';
    }
    const dir = direccion.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const sql = `
        SELECT id, titulo, genero, imagen, precio
        FROM libros
        WHERE activo = 1
        ORDER BY ${campo} ${dir}
    `;
    return connection.query(sql);
};

export default {
    selectAllBooksActive,
    selectBooksById,
    selectBooksOrdered
};