import type { RowDataPacket } from "mysql2";
import type { RegisterUser, LoggedUser, UserRow }  from "../types/types.js";
import { pool } from "../db/connections.js";
import bcrypt from 'bcrypt'

export async function registerService ({email, password, name, lastname}: RegisterUser){
  if(!email || typeof email != "string"){
    throw new Error('invalid email')
  }
  if(!password || typeof password != "string"){
    throw new Error('invalid password')
  }
  if(!name || typeof name != "string"){
    throw new Error('invalid name')
  }  
  if(!lastname || typeof lastname != "string"){
    throw new Error('invalid lastname')
  }

  const saltRounds = 10  
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT user_id FROM users WHERE email = ?', [email])
    if (rows.length > 0){
      throw new Error('email already in use')
    }
    
    const [result] = await pool.query('INSERT INTO users (email, name, lastname, password_hash) VALUES (?, ?, ?, ?)', [email, name, lastname, hashedPassword])

    const insertId = (result as any).insertId

    return insertId

  } catch (error: any) {
    console.error('DB error message:', error.message)
    throw error
  }
}

export async function loginService ({ email, password }: LoggedUser){
  if(!email || typeof email != "string"){
    throw new Error('invalid credentials')
  }
  if(!password || typeof password != "string"){
    throw new Error('invalid credentials')
  }
  
  try {
    const [rows] = await pool.query<UserRow[]>('SELECT user_id, password_hash FROM users WHERE email = ?', [email])
    if (rows.length === 0){
      throw new Error('Invalid credentials')
    }

    const user = rows[0]!

    const { user_id, password_hash } = user

    const loggedPassword = await bcrypt.compare(password, password_hash)

    if (!loggedPassword){
      throw new Error('Invalid credentials')
    }

    return user_id

  } catch (error) {
    console.error('Error fetching user', error)
    throw new Error('Error fetching user')
  }  
}

export async function insertRefreshService (userId: number, refreshToken: string) {
  try {
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 15)

    const [result] = await pool.query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)', [userId, refreshToken, expiresAt])

    const insertId = (result as any).insertId

    return insertId
    
  } catch (error) {
    console.error('Error inserting refresh token', error)
    throw new Error('Error inserting refresh token')
  }
}


export async function findRefreshService (userId: number, refreshToken: string) {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM refresh_tokens WHERE user_id = ? AND token = ? ', [userId, refreshToken ])
    
    if (rows.length === 0){
      return null // devuelve null y no error como los otros, porque tranquilamente puede no haber refresh / expirado
    }

    const expirationDate = rows[0]!.expired_at
    if (expirationDate < new Date){
      return null
    }

    return rows[0]

  } catch (error){
    console.error('Error finding refresh token', error)
    throw new Error('Error finding refresh token')
  }
}

export async function deleteRefreshTokenService (userId: number, refreshToken: string) {
  try {
    await pool.query('DELETE FROM refresh_tokens WHERE token = ? AND user_id = ?', [refreshToken, userId])

  } catch (error) {
    console.error('Error deleting refresh token', error)
    throw new Error('Error deleting refresh token')
  }
}
