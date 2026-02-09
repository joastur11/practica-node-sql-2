import type { RowDataPacket } from "mysql2";
import { pool } from "../db/connections.js";

export async function profileService (id: number) {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT email, name, lastname, created_at FROM users WHERE user_id = ?', id)

    if (rows[0] === undefined){
      throw new Error('User not found')
    }

    return rows[0]
  } catch (error) {
    console.error('Error fetching user data', error)
    throw new Error ('Error fetching user data')
  }
}
