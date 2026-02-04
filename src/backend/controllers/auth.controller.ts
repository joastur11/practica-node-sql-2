import type { Request, Response } from "express";
import { registerService } from "../services/auth.services.js";

export async function register (req: Request, res: Response) {
  try {
    const { email, password, name, surname } = req.body

    const newUserId = await registerService({ email, password, name, surname })

    return res.status(201).json({ newUserId })

  } catch (error) {
    console.error('error en el registro: ', error)
    
    if (error instanceof Error){
      if (error.message === 'email already in use'){
        return res.status(409).json ({ error: error.message })
      }
      return res.status(400).json ({ error: error.message })
    }
        
    return res.status(400).json ({ error: 'Error en el registro' })
  }
}
