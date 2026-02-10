import { createPool } from "mysql2/promise";
import 'dotenv/config'

export const pool = createPool ({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  database: process.env.DB_NAME!,
  port: Number(process.env.DB_PORT!),
  connectionLimit: 10
})
