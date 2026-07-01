const contenedorlibros = document.querySelector('.contenedor-libros');
const getLibroForm = document.getElementById('getLibro-form')
const urlBase = "http://localhost:3000/api/libros"

 getLibroForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    let libroId = data.libroId;
    
    try {
        let response = await fetch(`${urlBase}/${libroId}`);
        console.log(response);

        if(response.ok) {
            let datos = await response.json();
            console.log(datos);
            let libro = datos.payload[0];
            console.log(libro);

                let htmlLibro = `
                    <li class="li-listados">
                        <img src="${libro.imagen}" alt="${libro.titulo}" class="img-listados">
                        <p>Id: ${libro.id} / Nombre: ${libro.titulo} / <strong>Precio: $${libro.precio}</strong></p>
                    </li>
                `;

            contenedorlibros.innerHTML = htmlLibro;
        } else {
            alert("Error, TO DO agregar optimizacion")
        }

    } catch(error) {
        console.log(error);
        console.error("Error al obtener el libro: ", error.message);
    }
});