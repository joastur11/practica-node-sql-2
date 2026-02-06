import { Router } from "express";
import { profile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = Router()

router.get('/', authMiddleware, profile ) // middleware siempre antes que controller

export default router
