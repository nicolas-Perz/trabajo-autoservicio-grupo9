import { Sequelize } from "sequelize";
import environments from "../config/environments.js";

const {database} = environments

const sequelize = new Sequelize(
    database.name,
    database.user,
    database.password,
    {
        host: database.host,
        dialect: "mysql",
        logging:false,
        define:{
            timestampos: false,
            underscored: false
        }
    }
)

export const connectDatabase = async () => {
    try{
        await sequelize.authenticate()
        console.log(`Conectados a la database: ${database.name}`)
        sequelize.sync({alter:true})
    }catch(e){
        console.error(e)
        throw error
    }
}

export default sequelize