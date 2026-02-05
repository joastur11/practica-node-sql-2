import type { Request } from 'express'

declare global {
  namespace Express {
    interface Request {
      userId?: number
    }
  }
}

// esto es para que el token jwt en el middleware pueda 'viajar' a las otras paginas