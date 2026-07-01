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
    ("Harry Potter y la piedra filosofal", "Fantasia", "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale,dpr_1.5/jackets/9781408855652.jpg", 9000),
    ('Fundación', 'ciencia ficcion', 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/704220-46ee89820c4923330717363961023903-1024-1024.webp', 12500),
    ('Yo, robot', 'ciencia ficcion', 'https://www.ramonacultural.com/wp-content/uploads/2019/06/200208_600.jpg', 9900),
    ('El problema de los tres cuerpos', 'ciencia ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcMrd8pA7RiPT6VutXnnYKudk5ykxX95XFSSMGE2JOYyxn9qzrKoKKkwe&s=10', 14200),
    ('Neuromante', 'ciencia ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtFPgldy8KdYoVOSowact061jhXHhx5coeVgGKZBlkOms1mj2zaPQAtsyF&s=10', 11800),
    ('La guerra de los mundos', 'ciencia ficcion', 'https://granicaeditor.com/tapas/9789563164411.jpg', 8500),
    ('El juego de Enders', 'ciencia ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_vkZvhkGlAfvytETTVvTJtmeudzU7LdnRyyPgYKbjaCgejDHmTisY3o8w&s=10', 13500),
    ('Los desposeídos', 'ciencia ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGeXpSVFvq9vymkNbnqZZcS0mn2xf7dJOoX89S-NA8WXtTOuhAPhkAyJP4&s=10', 12900),
    ('Solaris', 'ciencia ficcion', 'https://images.cdn2.buscalibre.com/fit-in/360x360/b9/6a/b96a341f774d5c7b56b1f74863fa41c3.jpg', 11700),
    ('Crónicas marcianas', 'ciencia ficcion', 'https://tienda.planetadelibros.com.ar/cdn/shop/products/D_614309-MLA41719563010_052020-O.jpg?v=1684348431', 10200),
    ('El fin de la eternidad', 'ciencia ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6WOvjTccCP-ii6K5FfipCfuCaFWcUMfJ3Ndr-gI5Veyl8_D3cALyMaAX&s=10', 14100),
    ('El camino de los reyes', 'fantasia', 'https://www.penguinlibros.com/ar/7605853-home_default/el-camino-de-los-reyes-el-archivo-de-las-tormentas-1.jpg', 19000),
    ('El color de la magia', 'fantasia', 'https://www.penguinlibros.com/ar/1596632/el-color-de-la-magia-mundodisco-1.jpg', 10800),
    ('El ojo del mundo', 'fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaW6Wc9F4g8_5pJhnIdNYpIl1ZAyYcCN5Hzkm64fBOXsZY9ozKL9IOCRU&s=10', 17200),
    ('El nombre del viento', 'fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScobkTzGtG0LXRvBawZJ2VAT3zaVqjldQIQeI8BCVD4KBrtMVZKS3Wl_7P&s=10', 15000),
    ('Juego de tronos (Canción de Hielo y Fuego)', 'fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB_SknuL2cTF6wgOmR-prLD_gx6FXZKZPNSqQapo7CTveiSNZkX7hYDG14&s=10', 16500),
    ('Nacidos de la bruma (Mistborn)', 'fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRu6LWbM1KqamqugL6IHPvyIqIT1YS3FYKx5IM2K2FlZamZNBEjNyxntFu&s=10', 13700),
    ('La historia interminable', 'fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkNgUYnR7yDkFqCa0AzVE2SpayjR20uN85Ou04-PfgzUo3PV4uV4i-mK8&s=10', 10200),
    ('Las crónicas de Narnia: El león, la bruja y el armario', 'fantasia', 'https://images.cdn3.buscalibre.com/fit-in/360x360/76/08/7608d458499a573da01c43ebd8de9b22.jpg', 9000),
    ('Los nueve príncipes de Ámbar', 'fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5vkE6nBHcbhohKPGgJMDAW1fh4qop2aV9azrhUje2J2UIZvsBSciu4Mo&s=10', 11500),
    ('Stardust', 'fantasia', 'https://m.media-amazon.com/images/I/91p8dUf16LL.jpg', 12000),
    ('It', 'terror', 'https://images.cdn1.buscalibre.com/fit-in/360x360/ec/c6/ecc6925af7478dd66fce402ea5e3dda0.jpg', 18000),
    ('El resplandor', 'terror', 'https://images.cdn2.buscalibre.com/fit-in/360x360/2b/f4/2bf446b4fb582f86bb6616ee8bc279aa.jpg', 14500),
    ('Drácula', 'terror', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQju_Hi1gmwbBKl9paO77pKuZN_cCvQO7pVbZFodY5utIjVOXql7uiEgIY&s=10', 9500),
    ('Frankenstein', 'terror', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpeFrRafUvju-gfj6KuixUTgQa-j0v5IFoJI-CIn8HJKMhdDTVXY_Ubgo&s=10', 8900),
    ('El exorcista', 'terror', 'https://images.cdn3.buscalibre.com/fit-in/360x360/6b/3d/6b3dde0db6385eb6333c824e928f03ea.jpg', 12000),
    ('La llamada de Cthulhu', 'terror', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCqKvlSxAjRzwZgxfUuQmVgAamEErkRXwaqQhIDL0_UJde_5O-C-_8uz4&s=10', 8500),
    ('La casa de los espíritus', 'terror', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlgDOl1_rysg1bTp9HbdMj-SE5ATW3KqJTtKii-_1pps2UJt8Y6kgh1SE&s=10', 13700),
    ('El código Da Vinci', 'misterio', 'https://images.cdn2.buscalibre.com/fit-in/360x360/49/54/4954e233ad1e1a43e3f8187cd91c6997.jpg', 12500),
    ('La chica del dragón tatuado', 'misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3L3NPBnI9lvWGuhtAOSWtyaF6HZfWvP8fD1yMm7EoCUCzVacXn8LLu7E&s=10', 14300),
    ('Perdida', 'misterio', 'https://images.cdn1.buscalibre.com/fit-in/360x360/01/b5/01b500597d555ef79a1b6e443ca3a0de.jpg', 13000),
    ('El silencio de los corderos', 'misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiKXiBH44qFSvvjnpImvPB0Y3u2z8FA3AFMWfj0BsssAdoAASf5nUpwFc&s=10', 11800),
    ('El nombre de la rosa', 'misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2VtkiUOMiNGbU293HnndAwflgysMl7tVkVBFzYdUf6VGHScConZUvriyt&s=10', 15000),
    ('La chica del tren', 'misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBaV9CTpUgiDnxqQbK_z8Fwu498jHIrzDNBeTj-f1uw&s', 12800),
    ('Y no quedó ninguno', 'misterio', 'https://m.media-amazon.com/images/I/51gdWyGWY3L._AC_UF1000,1000_QL80_.jpg', 9500),
    ('El cuento de la criada', 'misterio', 'https://images.cdn1.buscalibre.com/fit-in/360x360/f6/f7/f6f7638a2e33eb2baf56dc5e07b145f7.jpg', 12200),
    ('Cien años de soledad', 'drama', 'https://0.academia-photos.com/attachment_thumbnails/63761117/mini_magick20240803-1-qoc44q.png?1722721472', 14800),
    ('La sombra del viento', 'drama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsuU5tCgo-a8jho58NXMsFQ_OeMuAencCqW0h8hCVlQe1k6EyUsNGGkQhl&s=10', 13900),
    ('El principito', 'drama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsxudlLQiXlkeu4gYLu-X1gFYDBpjV1vc6da8GO9SellLO1Uf5R9QYKfc&s=10', 7500),
    ('Los miserables', 'drama', 'https://i.pinimg.com/736x/33/ec/73/33ec730cd95ee8c3b2d3773ab34d8af3.jpg', 16500),
    ('Matar a un ruiseñor', 'drama', 'https://pendulo.com/imagenes_grandes/9781400/978140034334.GIF', 11000);