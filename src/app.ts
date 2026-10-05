import express from "express"
import "./database/prisma"

const app = express()
app.use(express.json())



export default app
