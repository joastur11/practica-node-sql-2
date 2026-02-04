export type User = {
  email: string,
  password: string,
  name: string,
  surname: string
}

export type UserRow = {
  user_id: number,
  password_hash: string
}
