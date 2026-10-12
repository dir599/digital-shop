import { Router } from "express";
import { deleteProductController, getProductController, productController, updateProductController } from "./product.controller";


const router =  Router()
router.post("/createProduct", productController)
router.get("/getProduct", getProductController)
router.patch("/updateProduct/:id", updateProductController)
router.delete("/deleteProduct/:id", deleteProductController)

export default router