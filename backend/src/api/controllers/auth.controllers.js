import connection from "../database/db.js"

export const loginView = async (req,res) => {
    res.render("login",{
        title: "Login",
        about: "Introduce tu usuario"
    })
}

export const processLoginInfo = async (req,res) => {
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.render("login")
        }
        const sql = "SELECT * FROM usuarios WHERE email = ? AND contrasena = ?"
        const [rows] = await connection.query(sql,[email,password])

        const user = rows[0]
        console.table(user)

        req.session.user = {
            id: user.id,
            email: user.email,
            contrasena: user.contrasena,
            es_admin: user.es_admin
        }

        res.redirect("/dashboard/")

    }catch(e){
        console.error(e)
    }
}

export const destroyLogin = (req,res) => {
    req.session.destroy((error) => {
        if(error){
            console.error(`Error al cerrar sesion: ${error}`)

            return res.status(500).json({message:"Error al cerrar sesion"})
        }
        res.redirect("/login")
    })
}