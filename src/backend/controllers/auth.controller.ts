import type { Request, Response } from "express";
import { registerService } from "../services/auth.services.js";

export function register (req: Request, res: Response) {
  try {
    const { email, password, name, surname } = req.body

    registerService({ email, password, name, surname })

    return res.status(200).json({ ok: 'todoi ok' })

  } catch (error) {
    console.error('error en el registro: ', error)

    if (error instanceof Error){
      return res.status(400).json ({ error: error.message })
    }
    
    return res.status(400).json ({ error: 'Error en el registro' })
  }
}
