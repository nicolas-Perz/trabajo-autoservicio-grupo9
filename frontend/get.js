const contenedorlibros = document.querySelector('.contenedor-libros');
const getLibroForm = document.getElementById('getLibro-form')
const urlBase = "http://localhost:3000/api/libros"

 getLibroForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const libroId = event.target.libroId.value.trim()
    // .value -> extraigo unicamente el valor
    // .trim() -> limpio espacios vacios 

    if(!libroId){
        mostrarMensaje("Ingresá un id válido")
        return
    }

    /*
    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    let libroId = data.libroId;
    */
    
    try {
        let response = await fetch(`${urlBase}/${libroId}`);
        let data = await response.json();

        if(!response.ok) {
            console.table(data)
            mostrarMensaje(data.message)
            return
        }

        let libro = data.payload[0];

            let htmlLibro = `
                <ul>
                    <li class="li-listados">
                        <img src="${libro.imagen}" alt="${libro.titulo}" class="img-listados">
                        <p>Id: ${libro.id} / Nombre: ${libro.titulo} / <strong>Precio: $${libro.precio}</strong></p>
                    </li>
                </ul>
            `;

        contenedorlibros.innerHTML = htmlLibro;

    } catch(error) {
        console.log(error);
        console.error("Error al obtener el libro: ", error.message);
    }
});

function mostrarMensaje(mensaje){
    contenedorlibros.innerHTML = `
        <p>${mensaje}</p>
    `
}