import type { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

// este middleware se usa para rutas que necesitan saber quien soy, ej, te loggeas y entras a ruta profile, etc

export function authMiddleware (req: Request, res: Response, next: NextFunction){
  
  const authHeader = req.headers.authorization

  if (!authHeader){
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]  // quiero el token, el header viene "Bearer token" entonces: split -> quedan 2 partes, quiero la segunda [1]

  if (!token) {
    return res.status(401).json({ error: 'Invalid token format' })  // para el tipado
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!)  // el ! porque yo se que el .env existe

  if (typeof decoded !== 'object' || !('userId' in decoded)) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  // hasta aca: lee header, saca token y lo verifica

  req.userId = decoded.userId // dice que el id que viene en la request, es el mismo que el del token

  next()  // funcion de espress, un siga siga
}
