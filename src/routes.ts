import { Router } from "express";
import auth from "../src/auth/auth.routes"
import admin from "../src/admin/admin.routes"
import product from "../src/product/product.routes"


const router =  Router()
router.use("/auth", auth)
router.use("/admin", admin )
router.use("/product", product)


export default router