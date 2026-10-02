import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";

const sequelize = new Sequelize(envConfig.connectionString as string)

try {
    sequelize.authenticate()
    .then(()=>{
        console.log("Password is correct.")
    })
    .catch((err)=>{
        console.log("ERROR", err)
    })
} catch (error) {
    console.log("error:", error)
}

export default sequelize