import type { Request, Response } from "express";
import { loginService, insertRefreshService, registerService, findRefreshService, deleteRefreshTokenService } from "../services/auth.services.js";
import { refreshTokenGenerator, tokenGenerator } from "../utils/jwt.js";
import jwt, { type JwtPayload } from 'jsonwebtoken'

export async function register (req: Request, res: Response) {
  try {
    const { email, password, name, lastname } = req.body

    const newUserId = await registerService({ email, password, name, lastname })

    return res.status(201).json({ newUserId })

  } catch (error) {
    console.error('error en el registro: ', error)
    
    if (error instanceof Error){
      if (error.message === 'email already in use'){
        return res.status(409).json({ error: error.message })
      }
      return res.status(400).json({ error: error.message })
    }
        
    return res.status(400).json({ error: 'Error en el registro' })
  }
}

export async function login (req: Request, res: Response) {
  try {
    const { email, password } = req.body

    const userId = await loginService({ email, password })

    const accessToken = tokenGenerator(userId)
    const refreshToken = refreshTokenGenerator(userId)

    await insertRefreshService(userId, refreshToken)

    return res.status(200).json({ accessToken, refreshToken })
 
  } catch (error) {
    console.error('Error en login: ', error)

    return res.status(401).json({ error: 'Error en login' })
  }
}

export async function refresh (req: Request, res: Response) {
  try {
    const { refreshToken } = req.body
    if (!refreshToken){
      return res.status(401).json({ error: 'Refresh token not in request body' })   
    } 

    const verifiedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload
    const userId = verifiedToken.userId
    const dbToken = await findRefreshService(userId, refreshToken)

    if (!dbToken){
      return res.status(401).json({ error: 'Refresh token not in DB' }) 
    }
    
    await deleteRefreshTokenService(userId, refreshToken) // si existe y se verifica token, borra el token viejo  

    const newAccessToken = tokenGenerator(userId)
    const newRefreshToken = refreshTokenGenerator(userId) // crea nuevos para evitar tokens robados y sesiones infinitas

    await insertRefreshService(userId, newRefreshToken)

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    })
  } catch (error) {
   console.error('Refresh token not found: ', error)
   
      return res.status(404).json({ error: 'Refresh token not found' })   
  }
}
