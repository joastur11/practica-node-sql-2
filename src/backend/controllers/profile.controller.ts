import type { Request, Response } from "express"
import { profileService } from "../services/profile.services.js"

export async function profile (req: Request, res: Response){
  try {
    const userId = req.userId

    if (!userId){
      return res.status(401).json({ error: 'Error de perfil' })
    }

    const userData = await profileService(userId)

    return res.status(200).json(userData)
  } catch (error){
    console.error ('Invalid user token', error)

    return res.status(401).json({ error: 'Error de perfil' })
  }
}
