import type { RowDataPacket } from "mysql2"

export type RegisterUser = {
  email: string,
  password: string,
  name: string,
  lastname: string
}

export type LoggedUser = {
  email: string,
  password: string
}

export interface UserRow extends RowDataPacket {
  user_id: number,
  password_hash: string
}
