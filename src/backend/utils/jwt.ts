import jwt from 'jsonwebtoken'

export function tokenGenerator(userId: number) {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
  )

  return token
}

export function refreshTokenGenerator(userId: number) {
  const token = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '15d' }
  )

  return token
}
