import { Router } from "express";
import { refresh } from "../controllers/auth.controller.js";

const router = Router()

router.post('/', refresh )

export default router
