const contenedorLibros = document.getElementById('contenedor-libros')
const getLibroForm = document.getElementById('getLibro-form')
const contenedorForm = document.getElementById('contenedor-form')
const urlBase = "http://localhost:3000/api/libros"

function mostrarMensaje(type, message) {
    contenedorLibros.innerHTML = `
        <p class="mensaje mensaje-${type}">${message}</p>
    `;
}

function mostrarListaErrores(array) {
    let htmlErrores = "";
    array.forEach(error => {
        htmlErrores+= `<p class="mensaje mensaje-error">${error}</p>`
    });
    contenedorForm.innerHTML = htmlErrores;
}

getLibroForm.addEventListener("submit", async event => {
    event.preventDefault();

    const libroId = event.target.libroId.value.trim();
    console.log(libroId)

    if (!libroId) {
        mostrarMensaje("error", "Ingresá un ID valido");
        return;
    }
    
    try {
        const response = await fetch(`${urlBase}/${libroId}`);
        console.log(response);

        const datos = await response.json();

            if (!response.ok) {
            mostrarMensaje("error", datos.message);
            return;
        }
        console.log(datos);

        

        const libro = datos.payload;

        console.log(libro); 

        renderizarLibro(libro);

    } catch (error) {
        console.error("error", "Error al obtener el libro");

        mostrarMensaje("error", "Error de conexion con el servidor");
    }
});

function renderizarLibro(libro) {
    let htmlLibro = `
    <ul>
        <li class="lista-libro">
            <img src="${libro.imagen}" alt="${libro.titulo}">
            <p>Id: ${libro.id} / Nombre: ${libro.titulo} / <strong>Precio: $${libro.precio}</strong></p>
            <input type="button" id="updateLibro-button" value="Actualizar Libro">
        </li>
    </ul>
    `;

    contenedorLibros.innerHTML = htmlLibro;

    const deleteLibroButton = document.getElementById("updateLibro-button");

    deleteLibroButton.addEventListener("click", event => {
        event.stopPropagation();

        const confirmacion = confirm("Querés actualizar este libro?");
        console.log(confirmacion);

        if(!confirmacion) {
            alert("Eliminacion cancelada");
        } else {
            crearFormularioPut(event, libro);
        }
    });
}


async function crearFormularioPut(event, libro) {

    event.stopPropagation();
    console.table(libro);

    let updateFormHTML = `
        <hr>
        <form id="updateLibro-form" class="form-alta">
            <input type="hidden" name="id" value="${libro.id}">

            <label for="libroTitulo">Nombre</label>
            <input type="text" name="titulo" id="libroTitulo" value="${libro.titulo}" required>

            <label for="libroImagen">Imagen</label>
            <input type="text" name="imagen" id="libroImagen" value="${libro.imagen}" required>

            <label for="libroGenero">Categoria</label>
            <select name="genero" id="libroGenero" required>
                <option value="Fantasia">Fantasia</option>
                <option value="Ciencia Ficcion">Ciencia Ficcion</option>
            </select>

            <label for="libroPrecio">Precio</label>
            <input type="number" name="precio" id="libroPrecio" value="${libro.precio}" required>

            <label for="libroActivo">Activo</label>
            <select name="activo" id="libroActivo">
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
            </select>
            
            <div>
                <input type="submit" value="Actualizar libro">
            </div>
        </form>
    `;

    contenedorForm.innerHTML = updateFormHTML;

    const updateLibroForm = document.getElementById("updateLibro-form");

    updateLibroForm.addEventListener("submit", event => {
        actualizarLibro(event);
    });
}

async function actualizarLibro(event) {
    event.preventDefault();

    const formData = new FormData(event.target); 

    const data = Object.fromEntries(formData.entries()); 

    console.table(data)

    data.precio = Number(data.precio);

    try {
        const response = await fetch(urlBase,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log(response);

        const result = await response.json();
        console.log(result);

        // Optimizacion : Manejamos una respuesta no ok del servidor
        if (!response.ok) {
            
            contenedorForm.innerHTML = "";

            if (result.listaErrores) {
                mostrarListaErrores(result.listaErrores);
                result.listaErrores.forEach(error => {
                console.log(error);
            })
            }
            mostrarMensaje("error", result.message);
            console.log(result);

            console.log(result.listaErrores)
            return;

        }

        getLibroForm.innerHTML = "";
        contenedorForm.innerHTML = "";
        mostrarMensaje("exito", result.message);
        console.log(result.message);

    } catch (error) {
        console.error(error);
    }
}
