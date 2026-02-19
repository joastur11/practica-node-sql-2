import cors from 'cors'

export const corsMiddleware = () => cors({
  origin: true, // permite cualquier origin en dev
  credentials: false
})
