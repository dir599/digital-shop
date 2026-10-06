import { Router } from "express";
import auth from "../src/auth/auth.routes"


const router =  Router()
router.get("/auth", auth)


export default router