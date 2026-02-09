import jwt from 'jsonwebtoken'

export function tokenGenerator(userId: number) {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
  )

  return token
}
