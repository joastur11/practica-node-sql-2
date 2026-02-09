import { pool } from "../db/connections.js";

export async function profileService (id: number) {
  try {
    const [rows] = await pool.query('SELECT email, name, lastname, created_at FROM users WHERE user_id = ?', id)

    return rows
  } catch (error) {
    console.error('Error fetching user data', error)
    throw new Error ('Error fetching user data')
  }
}
