import { Router } from "express";
import { register } from "./auth.service";


const router = Router();

router.post("/register", register);

export default router;