import { Router } from "express";
import auth from "../src/auth/auth.routes"


const router =  Router()
router.use("/auth", auth)


export default router