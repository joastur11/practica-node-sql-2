import type { Request, Response } from "express";

export function register (req: Request, res: Response) {
  console.log('register controller ok')
  return res.send('register controller ok')
}
