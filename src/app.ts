import express from "express"
import "./database/prisma"
import router from "./routes"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())

app.use(cookieParser())
app.use("/", router)



export default app
