import { Router } from "express";
import { promoteToAdmin } from "./admin.controller";
import { verifyToken } from "../auth/auth.middleware";
import { adminMiddleware } from "./admin.middleware";


const router = Router()
router.patch("/admin/:id",verifyToken, adminMiddleware, promoteToAdmin)

export default router