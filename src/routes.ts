import { Router } from "express";
import auth from "../src/auth/auth.routes"
import admin from "../src/admin/admin.routes"


const router =  Router()
router.use("/auth", auth)
router.use("/admin", admin )


export default router