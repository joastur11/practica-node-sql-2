import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

const router = Router()

router.post('/', login )  // va metodo POST en vez de GET por seguridad, el GET va en el url

export default router
