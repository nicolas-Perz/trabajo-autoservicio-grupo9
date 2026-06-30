const form_post_productos = document.querySelector('.form-post')

form_post_productos.addEventListener('submit', async (e) => {
    e.preventDefault()

    const form_post = e.target // Para resetear el formulario una vez que se envie
    const formData = new FormData(form_post)
    const data = Object.fromEntries(formData.entries())

    data.precio = Number(data.precio)

    try{
        const response = await fetch("http://localhost:3000/api/libros/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        form_post.reset()

    }catch(e){
        console.error(e)
    }
})