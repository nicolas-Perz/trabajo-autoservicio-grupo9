// Variables globales
const contenedorlibros = document.querySelector(".contenedor-libros");
const urlBase = "http://localhost:3000/api/libros"

async function mostrarlibros() {
    try {
        const response = await fetch(urlBase);
        
        if(!response.ok){
            const parsedResponse = await response.json();
            throw new Error(parsedResponse.message)
        }
        
        const {payload} = await response.json();

        renderizarlibros(payload);
        console.table(payload)

    } catch(error) {
        console.error(error);
        mostrarMensaje(error)
    }
}

function renderizarlibros(array) {
    let htmlLibro = "";

    array.forEach(libro => {
        htmlLibro += `
            <div class="card-libro">
                <img src="${libro.imagen}" alt="${libro.titulo}">
                <h3>${libro.titulo}</h3>
                <p>Id: ${libro.id}</p>
                <p>$${libro.precio}</p>
                <p>${libro.activo}</p>
            </div>
        `;
    });
    
    contenedorlibros.innerHTML = htmlLibro;
}

function mostrarMensaje(mensaje){
    contenedorlibros.innerHTML = `
        <p>${mensaje}</p>
    `
}

mostrarlibros()