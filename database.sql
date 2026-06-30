DROP DATABASE IF EXISTS autoservicio;
CREATE DATABASE autoservicio;

CREATE TABLE libros (
     id INT AUTO_INCREMENT PRIMARY KEY,
     titulo VARCHAR (50) NOT NULL,
     genero ENUM('Ciencia Ficcion', 'Fantasia') NOT NULL,
     imagen VARCHAR(255) NOT NULL,
     precio DECIMAL (10, 2) NOT NULL,

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

    precio_total DECIMAL(10, 2) NOT NULL

    );
    
    CREATE TABLE ventas_libros(
        id INT PRIMARY KEY NOT NULL,
        id_venta INT NOT NULL,
        id_libro  INT NOT NULL,
        
        FOREIGN KEY (id_venta) REFERENCES ventas(id),
        FOREIGN KEY (id_libro) REFERENCES libros(id)
    );
    
    ---
    
    INSERT INTO libros (titulo,genero,imagen,precio) VALUES 
    ("1984","Ciencia Ficcion","img.png",10000),
     ("El Hobbit","Fantasia","img.png",15000),
      ("DUNE","Ciencia Ficcion","img.png",20000),
       ("El Señor de los Anillos,"Fantasia","img.png",5000),
        ("Fahrenheit","Ciencia Ficcion","img.png",7000),
         ("Harry Potter 1","Ciencia Ficcion","img.png",9000)