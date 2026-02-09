import type { Request, Response } from "express"

export async function profile (req: Request, res: Response){
  try {
    const userId = req.userId

    if (!userId){
      return res.status(401).json({ error: 'Error de perfil' })
    }

    return res.status(200).json(`Hola rey, tu user id es: ${userId}` )
  } catch (error){
    console.error ('Invalid user token', error)

    return res.status(401).json({ error: 'Error de perfil' })
  }
}
