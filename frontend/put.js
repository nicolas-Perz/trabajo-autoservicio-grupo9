const contenedorLibros = document.getElementById('contenedor-libros')
const getLibro_form = document.getElementById('getLibro-form')
const contenedorForm = document.getElementById('contenedor-form')
const urlBase = "http://localhost:3000/api/libros"

getLibro_form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    console.table(data)

    let libroId = data.libroId;
    let response = await fetch(`${urlBase}/${libroId}"`);

    let datos = await response.json();
    let libro = datos.payload[0];

    mostrarLibro(libro)
});


function mostrarLibro(libro) {
    let htmlLibro = `
        <li class="li-listados">
            <img src="${libro.imagen}" alt="${libro.titulo}" class="img-listados">
            <p>Id: ${libro.id} / Nombre: ${libro.titulo} / <strong>Precio: $${libro.precio}</strong></p>
        </li>
        <li>
            <input type="button" id="updateLibro_button" value="Actualizar libro">
        </li>
    `;

    contenedorLibros.innerHTML = htmlLibro;


    let updateLibro_button = document.getElementById("updateLibro_button");

    updateLibro_button.addEventListener("click", (event) => {
        formularioPutLibro(event, libro);
    });
}


function formularioPutLibro(event, libro) {
    event.stopPropagation();
    console.log(libro);

    let updateLibro = `
        <div id="updateLibros-container" class="crudForm-container">

            <h2>Actualizar libro</h2>

            <form id="updateLibros-form">

                <label for="libroId">Id</label>
                <input type="number" name="id" id="libroId" value="${libro.id}" readonly>


                <label for="libroGenero">Genero</label>
                <select name="genero" id="libroGenero" required>
                    <option value="Ciencia Ficcion">Ciencia Ficcion</option>
                    <option value="Fantasia">Fantasia</option>
                </select>


                <label for="libroImagen">Imagen</label>
                <input type="text" name="imagen" id="libroImagen" value="${libro.imagen}" required>


                <label for="libroTitulo">Nombre</label>
                <input type="text" name="titulo" id="libroTitulo" value="${libro.titulo}" required>


                <label for="libroPrecio">Precio</label>
                <input type="number" name="precio" id="libroPrecio" value="${libro.precio}"  required>

                <input type="submit" value="Actualizar libro">
            </form>
        </div>
    `;

    contenedorForm.innerHTML = updateLibro;

    let updateLibros_form = document.getElementById("updateLibros-form");
    updateLibros_form.addEventListener("submit", (event) => {
        actualizarLibro(event);
    });
}


// Enviamos los datos del formulario al servidor
async function actualizarLibro(event) {
    event.preventDefault();

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries());

    try {
        let response = await fetch(`${urlBase}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            console.log(response);
            let result = await response.json();

            console.log(result.message);
            alert(result.message);

            contenedorLibros.innerHTML = "";
            contenedorForm.innerHTML = "";

        } else {
            let error = await response.json();
            console.error("Error: ", error.message);
        }

    } catch (error) {
        console.error("Error al enviar los datos: ", error.message);
        alert("Error al procesar la solicitud");
    }
}