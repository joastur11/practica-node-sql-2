import type { RowDataPacket } from "mysql2"

export type User = {
  email: string,
  password: string,
  name: string,
  surname: string
}

export interface UserRow extends RowDataPacket {
  user_id: number,
  password_hash: string
}
