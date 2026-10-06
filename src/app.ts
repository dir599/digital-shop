import express from "express"
import "./database/prisma"
import router from "./routes"

const app = express()
app.use(express.json())

app.use("/", router)



export default app
