
const contenedorLibros = document.getElementById('contenedor-libros')
const getLibroForm = document.getElementById('getLibro-form')
const urlBase = "http://localhost:3000/api/libros"

getLibroForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const libroId = event.target.libroId.value.trim()

    if(!libroId){
        mostrarMensaje("Ingresá un id válido")
        return
    }

    try{
        const response = await fetch(`${urlBase}/${libroId}`);
        const data = await response.json()

        if(!response.ok){
            mostrarMensaje(data.message)
            return
        }

        const libro = data.payload[0]

        const htmlLibro = `
            <ul>
                <li class="lista-libro">
                    <img src="${libro.imagen}" alt="${libro.titulo}">
                    <p>Id: ${libro.id} / Nombre: ${libro.titulo} / <strong>${libro.precio}</strong></p>
                    <input type="button" id="deleteLibro-button" value="Eliminar Libro">
                </li>    
            </ul>
        `;
        contenedorLibros.innerHTML = htmlLibro

            const deleteLibroButton = document.getElementById('deleteLibro-button')
            
            // Al no pertenecer a un form capturo el evento click del boton en lugar del submit
            deleteLibroButton.addEventListener('click', (event) => {
                event.stopPropagation();
                const confirmacion = confirm("Eliminar?")
                if(!confirmacion){
                    alert("Cancelado")
                }else{
                    eliminarLibro(libro.id)
                }
            })
    }catch(e){
        console.error(e)
        mostrarMensaje("Error con el servidor")
    }
})

async function eliminarLibro(id){
    try{
        const response = await fetch(`${urlBase}/${id}`,{
            method:"DELETE"
        })
        const result = await response.json()
        console.log(result)

        // Manejamos un error no ok
        if(!response.ok){
            mostrarMensaje(result.message)
            return
        }

        mostrarMensaje(result.message)

    }catch(e){
        console.error(e)
        mostrarMensaje("Error con el servidor")
    }
}
function mostrarMensaje(mensaje){
    contenedorLibros.innerHTML = `
        <p>${mensaje}</p>
    `
}
