# Sistema Autoservicio - Div132 Grupo 9

## 👥 Integrantes
- Pérez Nicolás
- Mamani Leandro

## 📝 Descripción
Sistema de gestión de libros estilo autoservicio (compras directas y rápidas para retirar al momento) dividido en `backend` y `frontend`.

## 💠 Estructura de base de datos
### Tablas principales
```sql
-- Libros (catálogo)
libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    genero ENUM('Ciencia Ficcion', 'Fantasia') NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
)

-- Usuarios (administradores)
usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    contrasena VARCHAR(20) NOT NULL,
    es_admin BOOLEAN DEFAULT FALSE
)

-- Ventas (registro de compras)
ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    precio_total DECIMAL(10,2) NOT NULL
)

-- Relación muchos a muchos (ventas-libros)
ventas_libros (
    id INT PRIMARY KEY NOT NULL,
    id_venta INT NOT NULL,
    id_libro INT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES ventas(id),
    FOREIGN KEY (id_libro) REFERENCES libros(id)
) 
```

## 🔧 Herramientas
### Frontend
- HTML/CSS
- JavaScript
- Figma

### Backend
- Node.js (Express.js)
- Librerias:
  - MySQL2
  - cors
  - session_express
  - dotenv
  - nodemon
  - EJS

## 🎯 **Rutas y pantallas**
### 👤 **Cliente (frontend)**
| Ruta | Pantalla | Descripción | Funcionalidades |
|------|----------|-------------|----------------------|
| `/` | Bienvenida | Pantalla inicial con mensaje de bienvenida | Formulario para ingresar nombre + botón "Continuar" |
| `/libros` | Listado de libros | Muestra productos divididos en **dos categorías** (géneros) | • Visualización con imagen, título, género, precio<br>• Botones **+** y **−** para agregar/retirar del carrito<br>• **Paginación** para evitar sobrecarga visual |
| `/carrito` | Carrito de compras | Resumen de libros seleccionados | • Tabla con libros, cantidades y subtotales<br>• Botones para **agregar/retirar** unidades<br>• Opción para **eliminar todos** los libros de un mismo ID |
| `/ticket` | Ticket de compra | Confirmación final de la compra | • Muestra: libros, nombre del usuario, fecha actual y nombre de la app<br>• Botón para **descargar PDF**<br>• Botón **"Salir"** que reinicia el ciclo |

---

### 🔐 **Backend (administrador)**
| Ruta | Pantalla | Descripción | Funcionalidades |
|------|----------|-------------|----------------------|
| `/admin/login` | Login | Acceso al panel administrativo | • Campos: correo y contraseña (encriptada)<br>• **Botón de acceso rápido** con credenciales predeterminadas<br>• Validación de credenciales |
| `/admin/dashboard` | Dashboard | Panel principal de gestión | • Listado completo de libros<br>• Acciones por libros:<br>  &nbsp;&nbsp; **- Editar** (redirige a edición)<br>  &nbsp;&nbsp; **- Eliminar** (baja lógica con modal de confirmación)<br>  &nbsp;&nbsp; **- Activar** (para libros inactivos) |
| `/admin/libros/nuevo` | Alta de libros | Formulario de creación | • Campos: título, género, imagen, precio<br>• Al guardar → redirige al Dashboard |
| `/admin/libros/editar/:id` | Modificación de libro | Formulario de edición | • Mismos campos que en alta<br>• Al guardar cambios → redirige al Dashboard |

