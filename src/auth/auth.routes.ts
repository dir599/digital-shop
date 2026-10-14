import { Router } from "express";
import { forgetPassword, registerUser, userLogin, userLogout } from "./auth.controller";
import { verifyToken } from "./auth.middleware";


const router = Router();

router.post("/register", registerUser);
router.post("/login", userLogin)
router.post("/logout",verifyToken, userLogout)
router.post("/forgetPassword", forgetPassword)

export default router;