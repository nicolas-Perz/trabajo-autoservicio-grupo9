const contenedorLibros = document.getElementById("contenedor-libros");
const postLibroForm = document.getElementById("postLibro-form");
const urlBase = "http://localhost:3000/api/libros";

function validarFormulario(data) {
    const errores = [];

    if (!data.titulo || data.titulo.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (!data.precio || isNaN(data.precio) || Number(data.precio) < 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    if (!data.imagen) {
        errores.push("Debe incluirse una imagen");
    }

    if (!data.genero) {
        errores.push("Debe seleccionar un genero");
    }

    return errores;
}



// Optimizacion 2: Mostramos el mensaje de exito o error visualmente
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
    contenedorLibros.innerHTML = htmlErrores;
}


// Gestionamos el envio de datos del formlario
postLibroForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());

    // Optimizacion 3: parseamos precio antes de enviarlo, porque FormData devuelve todo como strings
    data.precio = Number(data.precio);

    const errores = validarFormulario(data);

    if (errores.length > 0) {
        console.log(errores);
        mostrarListaErrores(errores);
        return;
    }

    
    try {
        const response = await fetch(urlBase, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        console.log(response);

        const result = await response.json();

        if (!response.ok) {
            
            if (result.listaErrores) {
                mostrarListaErrores(result.listaErrores);
                return;
            }

            mostrarMensaje("error", result.message);
            return;
        }

        mostrarMensaje("exito", result.message);
        console.log(result.message);

    } catch (error) {
        console.error("Error al enviar los datos ", error);
        mostrarMensaje("error", "Error al procesar la solicitud")
    }
});