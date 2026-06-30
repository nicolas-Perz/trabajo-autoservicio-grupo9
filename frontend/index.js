// Variables globales
let contenedorlibros = document.querySelector(".contenedor-libros");

async function mostrarlibros() {
    try {
        let respuesta = await fetch("http://localhost:3000/api/libros");
        let formato = await respuesta.json();
        let libros = formato.payload;

        renderizarlibros(libros);
        console.table(libros)

    } catch(error) {
        console.error(error);
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
            </div>
        `;
    });
    
    contenedorlibros.innerHTML = htmlLibro;
}

mostrarlibros()