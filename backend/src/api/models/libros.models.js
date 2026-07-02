
// MODELOS DE LIBROS

import connection from "../database/db.js";
import sequelize from "../database/sequelize.js";
import { DataTypes } from "sequelize";

const libro = sequelize.define("libros",
    {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        titulo:{type:DataTypes.STRING,allowNull:false},
        imagen:{type:DataTypes.STRING,allowNull:false},
        genero:{type:DataTypes.ENUM(["Fantasia","Ciencia Ficcion","Terror","Misterio","Drama"]),allowNull:false},
        precio:{type:DataTypes.DECIMAL(10,2),allowNull:false},
        activo:{type:DataTypes.BOOLEAN,allowNull:false},
    },
    {timestamps:false}
)

// ORM

export const selectAllLibros = async() => {
    const rows = await libro.findAll({attributes:["id","titulo","imagen","precio","activo"]});
    return [rows]
}

export const selectLibroById = async (id) => {
    return await libro.findByPk(id);
}

export const insertLibro = (titulo,imagen,genero,precio,activo) => {
    return libro.create({titulo,imagen,genero,precio,activo});
}

export const selectInactiveLibros = () => {
    return libro.findAll({where: {activo: false},
        attributes: ["id","titulo","imagen","precio","activo"]
    });
}

export const updateLibro = (id,titulo,imagen,genero,precio,activo) => {
    return libro.update({titulo,imagen,genero,precio,activo},{where:{id}});
}

export const deleteLibro = (id) => {
    return libro.destroy({where:{id}});
}


/* =========== SIN ORM
export const selectAllLibros = () => {
    let sql = "SELECT id,titulo,imagen,precio,activo FROM libros"
    return connection.query(sql)
}

export const selectInactiveLibros = () => {
    let sql = "SELECT id,titulo,imagen,precio,activo FROM libros WHERE libros.activo = FALSE"
    return connection.query(sql)
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
*/