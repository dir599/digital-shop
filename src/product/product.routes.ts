import { Router } from "express";
import { deleteProductController, getProductByIdController, getProductController, productController, updateProductController } from "./product.controller";
import { verifyToken } from "../auth/auth.middleware";
import { authorizeRoles } from "../auth/authorizeRole";


const router =  Router()
router.get("/getProduct", getProductController)

router.post("/createProduct",verifyToken, authorizeRoles("ADMIN"), productController)
router.get("/getProductById/:id",verifyToken, authorizeRoles("ADMIN"), getProductByIdController)
router.patch("/updateProduct/:id",verifyToken, authorizeRoles("ADMIN"), updateProductController)
router.delete("/deleteProduct/:id",verifyToken, authorizeRoles("ADMIN"), deleteProductController)

export default router