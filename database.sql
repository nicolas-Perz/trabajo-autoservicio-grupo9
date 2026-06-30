DROP DATABASE IF EXISTS autoservicio;
CREATE DATABASE autoservicio;
USE autoservicio;

CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    genero ENUM('Ciencia Ficcion', 'Fantasia') NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    contrasena VARCHAR(20) NOT NULL,
    es_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    precio_total DECIMAL(10,2) NOT NULL
);

CREATE TABLE ventas_libros (
    id INT PRIMARY KEY NOT NULL,
    id_venta INT NOT NULL,
    id_libro INT NOT NULL,

    FOREIGN KEY (id_venta) REFERENCES ventas(id),
    FOREIGN KEY (id_libro) REFERENCES libros(id)
);

-- Inserción de libros

INSERT INTO libros (titulo, genero, imagen, precio) VALUES
    ("1984", "Ciencia Ficcion", "https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9780141036144%2F9780141036144-jacket-large.jpg&w=614&q=100", 10000),
    ("El Hobbit", "Fantasia", "https://bookbub-res.cloudinary.com/image/upload/f_auto,q_auto/v1584109356/blog/the-hobbit-book-cover-art-2003.jpg", 15000),
    ("DUNE", "Ciencia Ficcion", "https://m.media-amazon.com/images/I/81Ua99CURsL._AC_UF1000,1000_QL80_.jpg", 20000),
    ("El Señor de los Anillos", "Fantasia", "https://i.harperapps.com/hcanz/covers/9780261103252/y648.jpg", 5000),
    ("Fahrenheit", "Ciencia Ficcion", "https://i.pinimg.com/originals/8c/09/d9/8c09d9fcb63e9bee8b462ffe27d7de18.png", 7000),
    ("Harry Potter 1", "Ciencia Ficcion", "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale,dpr_1.5/jackets/9781408855652.jpg", 9000);